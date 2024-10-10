import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HeaderWithBackButton = ({title}) => {
  const navigation = useNavigation();

  const truncateTitle = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/9312/9312240.png',
          }}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>{truncateTitle(title,20)}</Text>
      </TouchableOpacity>
  
    </View>
  );
};

export default HeaderWithBackButton;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,

    backgroundColor: '#f9f9f9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
