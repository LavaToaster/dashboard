import * as React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { getRecentBuilds, IBambooResult } from '../../../../data/bamboo';
import BuildResult from '../../components/BuildResult';
import * as moment from 'moment';

interface IBuildsState {
  initialLoad: boolean;
  items: IBambooResult[];
  updateInterval: number;
  intervalId?: number;
  lastUpdated: string;
}

export default class Builds extends React.Component<null, IBuildsState> {
  state = {
    updateInterval: 10,
    initialLoad: true,
    intervalId: null,
    timeIntervalId: null,
    lastUpdated: '',
    items: [],
  };

  update = () => {
    return getRecentBuilds().then((items: IBambooResult[]) => {
      const lastUpdated = moment().format();

      this.setState({ items, lastUpdated });
    });
  };

  componentDidMount() {
    this.update().then(() => {
      const intervalId = setInterval(this.update, this.state.updateInterval * 1000);

      this.setState({ initialLoad: false, intervalId });
    });
  }

  componentWillUnmount() {
    if (!this.state.intervalId) {
      return;
    }

    clearInterval(this.state.intervalId);
  }

  render() {
    let title = null;

    if (!this.state.initialLoad) {
      title = `Recent Builds: (As of ${moment(this.state.lastUpdated).format('HH:mm:ss')})`;
    }

    return (
      <Card title={title} containerStyle={{ flexGrow: 1 }}>
        {this.state.initialLoad ? <Text>Loading...</Text> : null}
        {!this.state.initialLoad && this.state.items.map((item, key) => (
          <BuildResult key={key} result={item}/>
        ))}
      </Card>
    );
  }
}
