import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native';
import React from 'react';

import ButtonList from './components/ButtonList';
import { Background, Colors } from '../../utils/Constants';
import Container from '../../components/Container';


const _layoutHome = () => {
  return (
   <Container>
     <ButtonList />
   </Container>
  );
};

const styles = StyleSheet.create({
 
});

export default _layoutHome;
