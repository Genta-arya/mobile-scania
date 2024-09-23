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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFaultCodes} from '../../../API/service/FaultCodes/_serviceFaultCodes';
import {Colors} from '../../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

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

      // Menggandakan data 20 kali dengan ID yang berbeda
      //   const modifiedData = response.data.flatMap((item, index) =>
      //     Array.from({length: 500}, (_, i) => ({
      //       ...item,
      //       id: `${item.id}-${i + 1}`, // Mengubah ID untuk setiap item yang digandakan
      //     })),
      //   );

      //   setData(modifiedData);
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
    })
  };

  const handleCodePress = code => {
    // Navigasi ke PdfPreview dengan data kode
    navigation.navigate('PdfPreview', {pdfUri: code.pdfUrl});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.abu} />
      ) : (
        <>
          {!selectedFaultCode ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Search Fault Code..."
                value={searchInput}
                onChangeText={setSearchInput}
              />
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
              <TextInput
                style={styles.input}
                placeholder="Search Codes..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
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
                    <Text style={styles.suggestion}> ~ {code.code}</Text>
                  </TouchableOpacity>
                ))}
              {selectedFaultCode.codes.filter(code =>
                code.code.includes(searchTerm),
              ).length === 0 && (
                <Text style={styles.noCodeFound}>Not Found</Text>
              )}
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
    height: '100%',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginTop: 20,
  },
  backButton: {
    // hext warna kulit
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
