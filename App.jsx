import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/stack/myStack';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
      <FlashMessage
        position="bottom"
        style={{margin: 10, borderRadius: 10, padding: 10}}
        color="white"
        autoHide
        animated={true}
        duration={3000}
      />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
