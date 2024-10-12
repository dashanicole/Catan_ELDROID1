import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUsername('');
      setPassword('');
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername || trimmedPassword) {
      try {
        const usersResponse = await axios.get('http://localhost:5000/users');
        const usersData = usersResponse.data;
        const user = usersData.find(user => user.username === trimmedUsername);

        if (user) {
          if (user.password === trimmedPassword) {
            await AsyncStorage.setItem('user', JSON.stringify({ username: trimmedUsername }));
            alert('Login Successful!');
            navigation.navigate('Main');
          } else {
            alert('Invalid password!');
            setPassword('');
          }
        } else {
          alert('Account does not exist!');
          setUsername('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
          alert(error.response.data.message || 'An error occurred!');
        } else if (error.request) {
          alert('No response received from server!');
        } else {
          alert('An error occurred!');
        }
      }
    } else {
      alert('Please enter username and password!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
    width: '95%',
    paddingHorizontal: 8,
  },
  input: {
    height: 60,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 8,
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 1,
  },
});

export default LoginScreen;