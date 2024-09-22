import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Background } from '../utils/Constants'

const Container = ({children}) => {
  return (
    <ImageBackground source={Background.bg} style={styles.background}>
    <StatusBar barStyle="light-content" backgroundColor={'#8c837e'} hidden showHideTransition={'fade'}  />
    <View style={styles.container}>

      {children}
    
    </View>
  </ImageBackground>
  )
}

export default Container


const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover', 
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });
  