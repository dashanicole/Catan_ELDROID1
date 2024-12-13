import { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.43.223:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUsers();
    });
    return unsubscribe;
  }, [navigation]);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BALABAT & CATAN</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddUser', { onUserAdded: fetchUsers })
          }
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="SEARCH"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => navigation.navigate('DisplayProfile', { user: item })}
          >
            <Image
              source={{ uri: `http://192.168.43.223:3000${item.image}` }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal:15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
