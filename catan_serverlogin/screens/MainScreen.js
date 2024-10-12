import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, FlatList, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MainScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showPasswordFor, setShowPasswordFor] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase().trim();
    const newData = data.filter(item => 
      item.username.toLowerCase().includes(formattedQuery)
    );
    setFilteredData(newData);
    setSearchQuery(text);
  };

  const handlePress = (index) => {
    setShowPasswordFor(showPasswordFor === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
            style={styles.searchInput}
          />
          <Image
            source={require('../assets/searchicon.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <ScrollView>
        <FlatList 
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handlePress(index)}>
              <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>{item.username}</Text>
                {showPasswordFor === index && <Text style={styles.passwordText}>{item.password}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    padding: 5,
  },
  searchInput: {
    color: 'black',
    flex: 1,
    paddingVertical: 8,
    paddingRight: 40,
  },
  searchIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
  },
  listItemContainer: {
    padding: 25,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  listItem: {
    fontWeight: 'bold',
  },
  passwordText: {
    marginTop: 5,
    fontWeight: 'normal',
    color: 'gray',
  },
});

export default MainScreen;