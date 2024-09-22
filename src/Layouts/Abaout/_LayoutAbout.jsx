import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContainerContent from '../../components/ContainerContent';

const LayoutAbout = () => {
  return (
    <ContainerContent>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>About Dummy Company</Text>
        <Text style={styles.description}>
          This is a brief description of the dummy company. Here you can provide information about the company’s mission, vision, and services.
        </Text>
        <Text style={styles.subTitle}>Our Mission</Text>
        <Text style={styles.description}>
          To deliver high-quality products and services that exceed our customers' expectations.
        </Text>
        <Text style={styles.subTitle}>Our Vision</Text>
        <Text style={styles.description}>
          To be a leading company in our industry, recognized for our innovation and commitment to excellence.
        </Text>
      </View>
    </ContainerContent>
  );
};

export default LayoutAbout;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#21262d',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 10,
  },
});
