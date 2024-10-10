import { StyleSheet, Text, View, Image, Animated, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import icon from '../../../assets/icons.png'; // Pastikan path ini benar
import { Colors } from '../../../utils/Constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasi fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigasi ke Home setelah 3 detik
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 4000); 

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar backgroundColor={Colors.gray} barStyle="light-content" />
      <Image source={icon} style={styles.logo} />
    
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 50,
    elevation: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Ganti warna teks jika diperlukan
  },
});
