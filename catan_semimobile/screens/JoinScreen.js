import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

const JoinScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handleJoin = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      navigation.navigate('Chat', { username: trimmedUsername });
    } else {
      alert('Please enter a username!');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUsername('');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={(text) => setUsername(text.replace(/\s/g, ''))} // Removes spaces
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleJoin}>
          <Text style={styles.buttonText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
    height: '60%',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 8,
    color: 'black',
    fontSize: 18,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default JoinScreen;