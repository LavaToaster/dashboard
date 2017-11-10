import * as React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import DeployResult from '../../components/DeployResult';
import * as moment from 'moment';
import { getRecentDeployments, IBambooDeployResult } from '../../../../data/bamboo/index';

interface IDeploymentsState {
  initialLoad: boolean;
  items: IBambooDeployResult[];
  updateInterval: number;
  intervalId?: number;
  lastUpdated: string;
}

export default class Deployments extends React.Component<null, IDeploymentsState> {
  state = {
    updateInterval: 10,
    initialLoad: true,
    intervalId: null,
    lastUpdated: '',
    items: [],
  };

  update = () => {
    return getRecentDeployments().then((items: IBambooDeployResult[]) => {
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
      title = `Recent Deployments: (As of ${moment(this.state.lastUpdated).format('HH:mm:ss')})`;
    }

    return (
      <Card title={title} containerStyle={{ flex: .5 }}>
        {this.state.initialLoad ? <Text>Loading...</Text> : null}
        {!this.state.initialLoad && this.state.items.map((item, key) => (
          <DeployResult key={key} result={item}/>
        ))}
      </Card>
    );
  }
}
