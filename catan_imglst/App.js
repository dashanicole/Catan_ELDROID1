import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DATA = [
  { id: '1', name: 'ALPHA', image: require('./assets/alpha.jpg') },
  { id: '2', name: 'BRAVO', image: require('./assets/bravo.jpg') },
  { id: '3', name: 'CHARLIE', image: require('./assets/charlie.jpg') },
  { id: '4', name: 'DELTA', image: require('./assets/delta.jpg') },
  { id: '5', name: 'ECHO', image: require('./assets/echo.jpg') },
];

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  const filteredData = DATA.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {selectedUser ? (
        <View style={styles.detailSection}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#d32f2f" />
            </TouchableOpacity>
            <Text style={styles.headerText}>PROFILE</Text>
          </View>
          <Image source={selectedUser.image} style={styles.detailIcon} />
          <Text style={styles.detailName}>{selectedUser.name}</Text>
        </View>
      ) : (
        <View style={styles.listSection}>
          <Text style={styles.header}>CATAN, Diether D.</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Image source={require('./assets/searchicon.png')} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectUser(item)}>
                <View style={styles.userItem}>
                  <Image source={item.image} style={styles.userIcon} />
                  <Text style={styles.userName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  detailSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, 
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    padding: 10,
    elevation: 2,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  userIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  userName: {
    color: '#333',
    fontSize: 16,
  },
  detailIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignItems: 'center',
  },
  detailName: {
    color: '#333',
    fontSize: 24,
  },
});