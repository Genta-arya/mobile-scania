import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import ContainerContent from '../../components/ContainerContent';
import {Colors} from '../../utils/Constants';

const LayoutAbout = () => {
  const [loading, setLoading] = useState(true); // State untuk loading

  const handleLoadEnd = () => {
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.black} />
        </View>
      )}
      <WebView
        source={{uri: 'https://ebrakesys.vercel.app/about'}}
        style={styles.webview}
        onLoadEnd={handleLoadEnd}
      />
    </View>
  );
};

export default LayoutAbout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});
