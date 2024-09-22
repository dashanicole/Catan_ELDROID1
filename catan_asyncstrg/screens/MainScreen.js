// src/screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const getAccounts = async () => {
    const storedAccounts = JSON.parse(await AsyncStorage.getItem('accounts')) || [];
    setAccounts(storedAccounts);
  };

  // Clear AsyncStorage but keep the default user
  const clearStorageExceptDefault = async () => {
  const storedAccounts = JSON.parse(await AsyncStorage.getItem('accounts')) || [];
  const defaultAccount = storedAccounts.find(acc => acc.email === 'alpha@uc.edu.ph');

  // Check if there's only the default account
  if (storedAccounts.length === 1 && defaultAccount) {
    alert('No account to delete. Only the default account exists.');
    return; // Exit early since there's nothing to delete
  }

  await AsyncStorage.clear(); // Clear everything

  if (defaultAccount) {
    await AsyncStorage.setItem('accounts', JSON.stringify([defaultAccount])); // Add the default account back
    setAccounts([defaultAccount]); // Immediately update the account list to only show the default user
    console.log('Storage cleared, keeping default user');
    alert('Storage cleared successfully. Only the default user left.');
  } else {
    setAccounts([]); // If no default account, clear the list entirely
  }
};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
      getAccounts();
    });

    return unsubscribe;
  }, [navigation]);

  const filteredAccounts = accounts.filter(account =>
    account.email.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <View style={styles.listSection}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Image source={require('./images/searchicon.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      
      {/* Button to Clear Storage */}
      <TouchableOpacity onPress={clearStorageExceptDefault} style={{ padding: 15, backgroundColor: '#d32f2f', marginBottom: 10, borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold'  }}>Clear Storage</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredAccounts}
        keyExtractor={item => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.userItem}>
              <Image source={require('./images/usericon.jpg')} style={styles.userImage} />
              <Text style={styles.userName}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
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
  listSection: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
});

export default MainScreen;