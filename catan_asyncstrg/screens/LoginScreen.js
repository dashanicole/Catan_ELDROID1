// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
    });
 
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    // Trim spaces from email and password
    const trimmedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.toLowerCase().trim();

    if (trimmedEmail && trimmedPassword) {
      const storedAccounts = JSON.parse(await AsyncStorage.getItem('accounts')) || [];
      const emailExist = storedAccounts.find(acc => acc.email === trimmedEmail);
      const passwExist = storedAccounts.find(acc => acc.password === trimmedPassword);

      if (emailExist && passwExist) {
        await AsyncStorage.setItem('user', JSON.stringify({ email: trimmedEmail }));
        navigation.navigate('Main');
        alert('Login Successful!');
      } else if (emailExist) {
        alert('Invalid password!');
        setPassword(''); // Clear password field
      } else {
        alert('Account does not exist!');
        setEmail(''); // Clear email field
       setPassword(''); // Clear password field
      }
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
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
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '90%', // Adjusted to be responsive
    paddingHorizontal: 15, // Ensures proper padding on both sides
  },
  input: {
    height: 60,
    borderColor: 'gray',
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
    marginTop: 10,
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