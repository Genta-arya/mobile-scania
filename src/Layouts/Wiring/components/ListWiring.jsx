import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Image,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {showMessage} from 'react-native-flash-message';
  import {getDataWiring} from '../../../API/service/WiringDiagram/_serviceWiring';
  import {useNavigation} from '@react-navigation/native';
  import {Colors, Icon} from '../../../utils/Constants'; // Pastikan Anda memiliki ikon PDF
  
  const ListWiring = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigation();
  
    const fetchData = async () => {
      setLoading(true);
      setRefreshing(false); // Reset refreshing state
      try {
        const response = await getDataWiring();
        setData(response.data);
        setFilteredData(response.data);
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
  
    const handleNavigate = pdfurl => {
      navigate.navigate('PdfPreview', {pdfUri: pdfurl});
    };
  
    const handleSearch = text => {
      setSearchQuery(text);
      if (text) {
        const filtered = data.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };
  
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleNavigate(item.fileUrl)}>
        <Image source={Icon.pdf} style={styles.pdfIcon} />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchData();
      showMessage({
        message: 'Refreshed successfully',
        type: 'success',
        icon: {icon: 'success', position: 'right'},
      })
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor={Colors.black}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : filteredData.length === 0 ? (
          <Text style={styles.noDataText}>No wiring diagrams available</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false} // Menonaktifkan scroll bar
            refreshing={refreshing}
            onRefresh={onRefresh} // Menangani pull to refresh
          />
        )}
      </View>
    );
  };
  
  export default ListWiring;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 20,
    },
    searchInput: {
      height: 40,
      borderColor: '#CCC',
      borderWidth: 1,
      color: Colors.black,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      marginVertical: 8,
      elevation: 2,
    },
    pdfIcon: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    itemName: {
      fontSize: 16,
      color: '#555',
    },
    noDataText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#888',
      marginTop: 20,
    },
  });
  