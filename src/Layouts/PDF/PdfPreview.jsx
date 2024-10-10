import {StyleSheet, View, ActivityIndicator, ToastAndroid} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const PdfPreview = ({route}) => {
  const {pdfUri} = route.params;
  const navigate = useNavigation();
  const handleError = error => {
    showMessage({
      message: 'Failed to load PDF',
      type: 'danger',
      icon: {icon: 'danger', position: 'right'},
    });

    navigate.goBack();
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{uri: pdfUri, cache: false}}
        enableDoubleTapZoom
        maxScale={20}
        minScale={1}
        style={styles.pdf}
        onError={handleError}
        renderActivityIndicator={() => (
          <ActivityIndicator size="large" color="#000" />
        )}
      />
    </View>
  );
};

export default PdfPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  pdf: {
    backgroundColor: 'white',
    borderWidth: 1,
    flex: 1,
  },
});
