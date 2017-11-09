import * as React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { getRecentBuilds, IBambooResult } from '../../data/bamboo';
import BuildResult from './components/BuildResult/index';
import * as moment from 'moment';

interface IBuildState {
  initialLoad: boolean;
  items: IBambooResult[];
  updateInterval: number;
  intervalId?: number;
  lastUpdated: string;
}

export default class extends React.Component<any, IBuildState>  {
  state = {
    updateInterval: 10,
    initialLoad: true,
    intervalId: null,
    lastUpdated: '',
    items: [],
  };

  update = () => {
    return getRecentBuilds().then((items: IBambooResult[]) => {
      const lastUpdated = moment().format();

      this.setState({ items, lastUpdated });
    })
  }

  componentDidMount() {
    this.update().then(() => {
      const intervalId = setInterval(this.update, this.state.updateInterval * 1000);

      this.setState({ initialLoad: false, intervalId });
    });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    if (this.state.initialLoad) {
      return (
        <View>
          <Card>
            <Text>Loading...</Text>
          </Card>
        </View>
      )
    }

    return (
      <View>
        <Card>
          <Text>Recent Bamboo Items: (As of {moment(this.state.lastUpdated).format('HH:mm:ss')})</Text>

          {this.state.items.map((item, key) => (
            <BuildResult key={key} result={item} />
          ))}
        </Card>
      </View>
    );
  }
}
