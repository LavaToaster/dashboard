import * as React from 'react';
import { IBambooResult } from '../../../../data/bamboo/index';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';

interface IBuildResultProps {
  result: IBambooResult;
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

export default class BuildResult extends React.Component<IBuildResultProps> {
  public render() {
    const result = this.props.result;
    let style = styles.succeeded;

    if (result.isFailed) {
      style = styles.failed;
    }

    if (result.isBuilding) {
      console.log(result);
      style = styles.inProgress;
    }

    return (
      <Card containerStyle={style}>
        <Text>
          {result.planName} #{result.buildNumber}
        </Text>
      </Card>
    );
  }
}
