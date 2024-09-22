import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ContainerContent = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default ContainerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Membuat kontainer mengisi ruang yang tersedia
    padding: 20, // Jarak dalam kontainer
    margin: 10, // Jarak luar kontainer
    borderRadius: 10, // Sudut yang membulat
    backgroundColor: '#ffffff', // Warna latar belakang
    shadowColor: '#000', // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Offset bayangan
    shadowOpacity: 0.2, // Opasitas bayangan
    shadowRadius: 5, // Jarak bayangan
    elevation: 5, // Efek bayangan di Android
  },
});
