import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { getRecentBuilds, IBambooResult } from '../../data/bamboo';
import BuildResult from './components/BuildResult/index';
import * as moment from 'moment';

interface IBuildState {
  initialLoad: boolean;
  items: IBambooResult[];
  updateInterval: number;
  intervalId?: number;
  timeIntervalId?: number;
  lastUpdated: string;
  currentTime: string;
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
});

export default class Build extends React.Component<null, IBuildState>  {
  state = {
    updateInterval: 10,
    initialLoad: true,
    intervalId: null,
    timeIntervalId: null,
    lastUpdated: '',
    items: [],
    currentTime: null,
  };

  constructor() {
    super();

    this.state.currentTime = moment().format();
  }

  update = () => {
    return getRecentBuilds().then((items: IBambooResult[]) => {
      const lastUpdated = moment().format();

      this.setState({ items, lastUpdated });
    })
  };

  updateTime = () => {
    this.setState({
      currentTime: moment().format(),
    });
  };

  componentDidMount() {
    this.update().then(() => {
      const intervalId = setInterval(this.update, this.state.updateInterval * 1000);
      const timeIntervalId = setInterval(this.updateTime, 1000);

      this.setState({ initialLoad: false, intervalId, timeIntervalId });
    });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    if (this.state.timeIntervalId) {
      clearInterval(this.state.timeIntervalId);
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

    const currentTime = moment(this.state.currentTime);
    const isAlmostLunchTime = currentTime.get("hour") == 11 && currentTime.get("minute") >= 59;
    const isLunchTime = currentTime.get("hour") == 12;
    const isHomeTime = currentTime.get("hour") >= 17;

    return (
      <View>
        <Card>
          <Text>Recent Bamboo Items: (As of {moment(this.state.lastUpdated).format('HH:mm:ss')})</Text>

          {this.state.items.map((item, key) => (
            <BuildResult key={key} result={item} />
          ))}
        </Card>

        <View style={styles.timeContainer}>
          <Text style={{fontSize: 40}}>
            {isHomeTime ? "🏠 " : "🏢 "}
            {currentTime.format('HH:mm:ss')}
            {isAlmostLunchTime ? " (Soon)" : ""}
            {isLunchTime ? " (LUNCH O'CLOCK 🎉)" : ""}
          </Text>
        </View>
      </View>
    );
  }
}
