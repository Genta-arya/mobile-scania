import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  BackHandler,
  View,
} from 'react-native';
import ButtonList from './components/ButtonList';
import Container from '../../components/Container';

const _layoutHome = () => {
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        // Keluar dari aplikasi jika sudah menekan back dua kali
        BackHandler.exitApp();
      } else {
        // Menampilkan toast "tekan sekali lagi untuk keluar"
        ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
        setExitApp(true);

        // Reset exitApp setelah 2 detik jika tidak ada input back lagi
        setTimeout(() => {
          setExitApp(false);
        }, 2000);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [exitApp]);

  return (
    <Container>
      <ButtonList />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default _layoutHome;
