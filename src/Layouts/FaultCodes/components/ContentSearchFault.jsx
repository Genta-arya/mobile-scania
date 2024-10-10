import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFaultCodes} from '../../../API/service/FaultCodes/_serviceFaultCodes';
import {Colors} from '../../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {Icon} from '../../../utils/Constants';

const ContentSearchFault = () => {
  const [data, setData] = useState([]);
  const [selectedFaultCode, setSelectedFaultCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getFaultCodes();
      setData(response.data);
    } catch (error) {
      showMessage({
        message: 'Failed to retrieve data',
        type: 'danger',
        icon: {icon: 'danger', position: 'right'},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBack = () => {
    setSelectedFaultCode(null);
    setSearchInput('');
    setSearchTerm('');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
    showMessage({
      message: 'Refreshed successfully',
      type: 'success',
      icon: {icon: 'success', position: 'right'},
    });
  };

  const handleCodePress = code => {
    navigation.navigate('PdfPreview', {pdfUri: code.pdfUrl});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : (
        <>
          {!selectedFaultCode ? (
            <>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Search Fault Code..."
                  placeholderTextColor={Colors.black}
                  value={searchInput}
                  onChangeText={setSearchInput}
                />
                <Image source={Icon.search} style={styles.icon} />
              </View>

              {searchInput === '' && (
                <Text
                  style={{
                    ...styles.suggestion,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  Total Fault : {data.length}
                </Text>
              )}
              <FlatList
                data={data.filter(fault =>
                  fault.name.toLowerCase().includes(searchInput.toLowerCase()),
                )}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFaultCode(item);
                      setSearchInput('');
                    }}>
                    <Text style={styles.suggestion}>
                      {' '}
                      {index + 1}. {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.abu]}
                  />
                }
                style={{flex: 1}}
              />
              {data.filter(fault =>
                fault.name.toLowerCase().includes(searchInput.toLowerCase()),
              ).length === 0 && (
                <Text style={styles.noFaultFound}>Not Found</Text>
              )}
            </>
          ) : (
            <View style={styles.searchContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Search Codes..."
                  placeholderTextColor={Colors.black}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <Image source={Icon.search} style={styles.icon} />
              </View>
              <ScrollView style={{flex: 1}}>
                {searchTerm === '' && (
                  <Text
                    style={{
                      ...styles.suggestion,
                      marginTop: 10,
                      textAlign: 'center',
                    }}>
                    Total Codes : {selectedFaultCode.codes.length}
                  </Text>
                )}
                {selectedFaultCode.codes
                  .filter(code => code.code.includes(searchTerm))
                  .map(code => (
                    <TouchableOpacity
                      key={code.id}
                      onPress={() => handleCodePress(code)}>
                      <Text style={styles.codeItem}> ~ {code.code}</Text>
                    </TouchableOpacity>
                  ))}
                {selectedFaultCode.codes.filter(code =>
                  code.code.includes(searchTerm),
                ).length === 0 && (
                  <Text style={styles.noCodeFound}>Not Found</Text>
                )}
              </ScrollView>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ContentSearchFault;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  searchInputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    color: Colors.black,
    paddingLeft: 40,
    borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#8c837e',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  suggestion: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  codeItem: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    flexWrap: 'wrap', // Menambahkan pembungkusan teks
    maxWidth: '100%', // Membatasi lebar teks agar tetap di dalam container
  },
  noFaultFound: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  noCodeFound: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
