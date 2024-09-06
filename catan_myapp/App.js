import { Text, SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'; 
import React, { useState, useEffect } from 'react'; 

export default function App() {
  const [userName, setUserName] = useState('');
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const loadUserNames = async () => {
      try {
        const storedUserNames = await AsyncStorage.getItem('userNames');
        if (storedUserNames) {
          setUserNames(JSON.parse(storedUserNames));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUserNames();
  }, []);

  const handleAddUserName = async () => {
    const trimmedUserName = userName.trim();
    if (trimmedUserName.length === 0) {
      Alert.alert('Empty Name', 'Please enter a name!');
      return;
    }

    if (userNames.map(name => name.toLowerCase()).includes(trimmedUserName.toLowerCase()) )   {
      Alert.alert('Duplicate Name', `The name ${trimmedUserName} is already added!`);
      setUserName("");
      return;
    }


    const newUserNames = [...userNames, userName];
    setUserNames(newUserNames);
    setUserName('');
    try {
      await AsyncStorage.setItem('userNames', JSON.stringify(newUserNames));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATAN, Diether D.</Text>
      </View>
      <Card style={styles.card}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.inputUserName}
            placeholder="Enter Name"
            placeholderTextColor="#999"
            value={userName}
            onChangeText={setUserName}
          />
          <TouchableOpacity style={styles.userNameBttn} onPress={handleAddUserName}>
              <Text style={styles.userNameText}>+</Text>
            </TouchableOpacity>
            <FlatList
              data={userNames}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f7f0',
  },
  header: {
    padding: 10,
    backgroundColor: '#4682b4',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    marginTop: 7,
    padding: 2,
    backgroundColor: 'white',
    borderWidth: 2,
    height: 673,
  },
  cardContent: {
    padding: 10,
  },
  inputUserName: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "#FF9b96",
    textAlign: "'center",
    height: 40,
  },
  item: {
    padding: 5,
    textAlign: "'center",
  },
   userNameBttn: {
    backgroundColor: '#4682b4',
    padding: 10, 
    alignItems: 'center',
    marginBottom: 10,
  },
  userNameText: {
    color: '#fefefe',
    fontWeight: 'bold',
    fontSize: 16,
  }
});