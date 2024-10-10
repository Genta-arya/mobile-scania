import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFolderWorkshop} from '../../../API/service/Workshop/_serviceWorkshop';
import {Colors, Icon} from '../../../utils/Constants';
import {showMessage} from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const ListFolder = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getFolderWorkshop();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      showMessage({
        message: 'Failed to retrieve data',
        type: 'danger',
        icon: {icon: 'danger', position: 'right'},
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    showMessage({
      message: 'Refreshed successfully',
      type: 'success',
      icon: {icon: 'success', position: 'right'},
    });
  };

  const handleNavigate = (id , title) => {
    navigation.navigate('ListFile', {folderId: id , title: title}); 
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.folderItem}
      onPress={() => handleNavigate(item.id , item.name)}>
      <Image source={Icon.folder} style={styles.icon} />
      <Text style={styles.folderName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search folders..."
          placeholderTextColor={Colors.black}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Image source={Icon.search} style={styles.icons} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.black}/>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No folders available</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default ListFolder;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  searchInputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#CCC',
    color: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 40,
    marginBottom: 16,
  },
  icons: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  folderItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    minHeight: 120,
    maxWidth: '48%',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  folderName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    maxWidth: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});
