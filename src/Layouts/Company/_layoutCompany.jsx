import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Colors } from '../../utils/Constants';

const LayoutCompany = () => {
  const [loading, setLoading] = useState(true);

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
        source={{ uri: 'https://www.kppmining.com/profile' }}
        style={styles.webview}
        onLoadEnd={handleLoadEnd} 
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
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
});
