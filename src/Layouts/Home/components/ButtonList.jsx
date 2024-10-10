import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors, Icon } from '../../../utils/Constants'; // Pastikan pathnya benar
import { useNavigation } from '@react-navigation/native';

const ButtonList = () => {
    const navigation = useNavigation()
    const handleNavigate = (screen) => {
        navigation.navigate(screen);
    }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>MAIN MENU</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('FaultCodes')}>
            <Image source={Icon.search} style={styles.icon} />
            <Text style={styles.buttonText}>Search Fault Codes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Wiring')}>
            <Image source={Icon.pdf} style={styles.icon} />
            <Text style={styles.buttonText}>Wiring Diagram File</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('WorkShop')}>
            <Image source={Icon.folder} style={styles.icon} />
            <Text style={styles.buttonText}>Workshop Folder</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondaryButtonContainer} >
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Company')}>
            <Image source={Icon.company} style={styles.icon} />
            <Text style={styles.buttonText}>Company Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('About')}>
            <Image source={Icon.about} style={styles.icon} />
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    backgroundColor: 'rgba(191,187,176, 0.8)',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    width: '95%',
    paddingBottom: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 3,
    color: Colors.black,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
   
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: '30%', 
  },
  buttonText: {
    color: Colors.gray, 
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '900',
  },
  icon: {
    width: 24,  // Sesuaikan ukuran ikon
    height: 24, // Sesuaikan ukuran ikon
    marginBottom: 5, // Ruang antara ikon dan teks
  },
});
