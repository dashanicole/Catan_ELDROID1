import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]); // Original data from the server
  const [filteredData, setFilteredData] = useState([]); // Data to display based on search
  const [showPasswordFor, setShowPasswordFor] = useState(null); // Track which item should show the password

  // Fetch data from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/users') // Replace with your actual server IP or localhost
      .then(response => {
        setData(response.data); // Save the data
        setFilteredData(response.data); // Initially show all data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty array means it runs only once when the component mounts

  // Filter the data based on the search query
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase().trim();
    const newData = data.filter(item => 
      item.username.toLowerCase().includes(formattedQuery)
    );
    setFilteredData(newData); // Update the filtered data
    setSearchQuery(text); // Update search input value
  };

  // Toggle showing the password when an item is pressed
  const handlePress = (index) => {
    setShowPasswordFor(showPasswordFor === index ? null : index); // Toggle between showing/hiding the password
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATAN, Diether D.</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
            style={styles.searchInput}
          />
          <Image
            source={require('./assets/searchicon.png')} // Ensure this path matches your file location
            style={styles.searchIcon}
          />
        </View>
      </View>
      <ScrollView>
        <FlatList 
          data={filteredData} // Display the filtered data
          keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
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
  header: {
    padding: 20,
    backgroundColor: 'red',
  },
  headerText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    padding: 5,
  },
  searchInput: {
    fontColor: 'black',
    flex: 1,
    paddingVertical: 8,
    paddingRight: 40, // Space for the icon
  },
  searchIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10, // Position the icon on the right side
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
    color: 'gray', // You can adjust this color as needed
  },
});

export default App;