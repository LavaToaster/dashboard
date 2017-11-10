import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as moment from 'moment';
import Builds from './scenes/Builds';
import Deployments from './scenes/Deployments';

interface IBuildState {
  timeIntervalId?: number;
  currentTime: string;
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
});

export default class BambooDashboard extends React.Component<null, IBuildState> {
  state = {
    timeIntervalId: null,
    currentTime: null,
  };
  updateTime = () => {
    this.setState({
      currentTime: moment().format(),
    });
  };

  constructor() {
    super();

    this.state.currentTime = moment().format();
  }

  componentDidMount() {
    const timeIntervalId = setInterval(this.updateTime, 1000);

    this.setState({ timeIntervalId });
  }

  componentWillUnmount() {
    if (this.state.timeIntervalId) {
      clearInterval(this.state.timeIntervalId);
    }
  }

  render() {
    const currentTime = moment(this.state.currentTime);
    const isAlmostLunchTime = currentTime.get('hour') == 11 && currentTime.get('minute') >= 59;
    const isLunchTime = currentTime.get('hour') == 12;
    const isHomeTime = currentTime.get('hour') <= 9 || currentTime.get('hour') >= 17;

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Builds/>
          <Deployments/>
        </View>

        <View style={styles.timeContainer}>
          <Text style={{ fontSize: 40 }}>
            {isHomeTime ? '🏠 ' : '🏢 '}
            {currentTime.format('HH:mm:ss')}
            {isAlmostLunchTime ? ' (Soon)' : ''}
            {isLunchTime ? ' (LUNCH O\'CLOCK 🎉)' : ''}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
