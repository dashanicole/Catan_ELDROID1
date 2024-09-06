import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Text, ScrollView, Image } from 'react-native';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    { id: '1', title: 'ALPHA' },
    { id: '2', title: 'BRAVO' },
    { id: '3', title: 'CHARLIE' },
    { id: '4', title: 'DELTA' },
    { id: '5', title: 'ECHO' },
    { id: '6', title: 'FOXTROT' },
    { id: '7', title: 'GOLF' },
    { id: '8', title: 'HOTEL' },
    { id: '9', title: 'INDIA' },
    { id: '10', title: 'JULIET' },
    { id: '11', title: 'KILO' },
    { id: '12', title: 'LIMA' },
    { id: '13', title: 'MIKE' },
    { id: '14', title: 'NOVEMBER' },
    { id: '15', title: 'OSCAR' },
    { id: '16', title: 'PAPA' },
    { id: '17', title: 'QUEBEC' },
    { id: '18', title: 'ROMEO' },
    { id: '19', title: 'SIERRA' },
    { id: '20', title: 'TANGO' },
    { id: '21', title: 'UNIFORM' },
    { id: '22', title: 'VICTOR' },
    { id: '23', title: 'WHISKEY' },
    { id: '24', title: 'X-RAY' },
    { id: '25', title: 'YANKEE' },
    { id: '26', title: 'ZULU' },
  ]);

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

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
            onChangeText={text => setSearchQuery(text.trim())}
            style={styles.searchInput}
          />
          <Image
            source={require('./assets/searchicon.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <ScrollView>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.title}</Text>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f0',
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
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  searchInput: {
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
  listItem: {
    padding: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default App;