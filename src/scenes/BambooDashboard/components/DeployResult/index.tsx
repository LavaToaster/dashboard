import * as React from 'react';
import { IBambooDeployResult } from '../../../../data/bamboo/index';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';

interface IDeployResultProps {
  result: IBambooDeployResult;
}

const styles = StyleSheet.create({
  inProgress: {
    backgroundColor: '#4682B4',
  },
  failed: {
    backgroundColor: '#FA8072',
  },
  succeeded: {
    backgroundColor: '#32CD32',
  },
});

export default class BuildResult extends React.Component<IDeployResultProps> {
  public render() {
    const result = this.props.result;
    let style = styles.succeeded;

    if (result.isFailed) {
      style = styles.failed;
    }

    if (result.isDeploying) {
      console.log(result);
      style = styles.inProgress;
    }

    let name = result.name;

    if (name.startsWith('Deployment for')) {
      name = name.substr(14);
    }

    return (
      <Card containerStyle={style}>
        <Text>
          {name} {result.environment} {result.version}}
        </Text>
      </Card>
    );
  }
}
