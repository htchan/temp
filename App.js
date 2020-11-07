import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { allPermission, gpsPermission, cameraPermission } from './permission'
import { checkAll } from './check'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "test"
    };
  }

  render() {
    let text = "";
    if (this.state.enablePositioning === false) {
      text = "sad";
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button 
          onPress={allPermission}
          title="Press to test request ALL permission"
        />
        <Button 
          onPress={gpsPermission}
          title="Press to test request GPS permission"
        />
        <Button
          onPress={cameraPermission}
          title="Press to test request Camera permission (android only)"
        />
        <Button
          onPress={checkAll(this)}
          title="checking all"
        />
        <StatusBar style="auto" />
        <Text>{text}</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
