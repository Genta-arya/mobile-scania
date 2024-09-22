import {StyleSheet, View, ActivityIndicator, ToastAndroid} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const PdfPreview = ({route}) => {
  const {pdfUri} = route.params; // Mengambil URI PDF dari parameter navigasi
 const handleError = (error) => {
     ToastAndroid.show("Failed to load PDF", ToastAndroid.SHORT);
 }
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{uri: pdfUri, cache: true}}
        enableDoubleTapZoom
        enablePaging
        spacing={10}
        enableAnnotationRendering
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
