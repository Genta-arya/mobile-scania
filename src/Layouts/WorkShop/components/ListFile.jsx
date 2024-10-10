import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TextInput,
    RefreshControl,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {getFileWorkshop} from '../../../API/service/Workshop/_serviceWorkshop';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import {showMessage} from 'react-native-flash-message';
  import HeaderWithBackButton from './Header';
  import {Colors, Icon} from '../../../utils/Constants';
  
  const ListFile = () => {
    const route = useRoute();
    const {folderId, title} = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigation();
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFileWorkshop(folderId);
        setData(response.data.files);
        setFilteredData(response.data.files);
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
    }, [folderId]);
  
    const handleRefresh = () => {
      setRefreshing(true);
      fetchData().finally(() => setRefreshing(false));
      showMessage({
        message: 'Refreshed successfully',
        type: 'success',
        icon: {icon: 'success', position: 'right'},
      })
    };
  
    const getFileNameFromUrl = url => {
      const fileName = decodeURIComponent(url.split('/o/').pop().split('?')[0]);
      const cleanFileName = fileName.split('pdfs/').pop();
      return cleanFileName;
    };
  
    const handleNavigate = pdfurl => {
      navigate.navigate('PdfPreview', {pdfUri: pdfurl});
    };
  
    const handleSearch = text => {
      setSearchQuery(text);
      if (text) {
        const filtered = data.filter(item =>
          getFileNameFromUrl(item.fileUrl)
            .toLowerCase()
            .includes(text.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };
  
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={styles.fileItem}
        onPress={() => handleNavigate(item.fileUrl)}>
        <Image source={Icon.pdf} style={styles.pdfIcon} />
        <Text style={styles.fileName}>{getFileNameFromUrl(item.fileUrl)}</Text>
      </TouchableOpacity>
    );
  
    return (
      <>
        <HeaderWithBackButton title={title} />
        <View style={styles.container}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search files..."
              placeholderTextColor={Colors.black}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <Image source={Icon.search} style={styles.icon} />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.black} />
          ) : filteredData.length === 0 ? (
            <Text style={styles.noDataText}>No files available</Text>
          ) : (
            <FlatList
              data={filteredData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
        </View>
      </>
    );
  };
  
  export default ListFile;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 20,
    },
    list: {
      paddingBottom: 20,
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
    searchInput: {
      height: 40,
      borderColor: '#CCC',
      borderWidth: 1,
      borderRadius: 8,
      color: Colors.black,
      paddingHorizontal: 10,
      paddingLeft: 40,
      marginBottom: 20,
    },
    fileItem: {
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
    fileName: {
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
  