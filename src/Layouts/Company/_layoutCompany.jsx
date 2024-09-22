import { StyleSheet, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const LayoutCompany = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.kppmining.com/profile' }}
        style={styles.webview}
      />
    </View>
  );
};

export default LayoutCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
