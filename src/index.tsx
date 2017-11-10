import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import BambooDashboard from './scenes/BambooDashboard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default class extends React.Component {
  state = {
    fill: 40,
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />

        <BambooDashboard/>
      </View>
    );
  }
}
