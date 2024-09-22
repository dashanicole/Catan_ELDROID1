// src/screens/AddAccountScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    const trimmedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Function to check for spaces
    const containsSpaces = (str) => str.includes(' ');

    if (trimmedEmail && trimmedPassword && trimmedConfirmPassword) {
      if (containsSpaces(trimmedEmail) || containsSpaces(trimmedPassword)) {
        Alert.alert('Error', 'Email and password should not contain spaces.');
        return;
      }

      if (trimmedPassword === trimmedConfirmPassword) {
        try {
          const storedAccounts = JSON.parse(await AsyncStorage.getItem('accounts')) || [];
          const accountExists = storedAccounts.some(account => account.email === trimmedEmail);

          if (accountExists) {
            Alert.alert('Error', 'An account with this email already exists.');
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            setConfirmPassword(''); // Clear confirm password input
            return;
          }

          const newAccount = { email: trimmedEmail, password: trimmedPassword };
          const updatedAccounts = [...storedAccounts, newAccount];

          await AsyncStorage.setItem('accounts', JSON.stringify(updatedAccounts));

          Alert.alert('Success', `Added new account: ${trimmedEmail}`);
          navigation.goBack(); // Return to the previous screen after saving
        } catch (error) {
          console.error('Error saving account:', error);
          Alert.alert('Error', 'Error saving account. Please try again!');
        }
      } else {
        Alert.alert('Error', 'Passwords do not match!');
        setPassword(''); // Clear password input
        setConfirmPassword(''); // Clear confirm password input
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields!');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={styles.inputAdd}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.inputAdd}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.inputAdd}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  inputAdd: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 8,
    color: 'black',
    width: '100%', // Full width of the container
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 1, 
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons side by side
    justifyContent: 'space-between', // Space between buttons
  },
  buttonSave: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '48%', // Adjust width to fit buttons side by side
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#007bff', // Red background for cancel
    padding: 15,
    borderRadius: 5,
    width: '48%', // Adjust width to fit buttons side by side
    alignItems: 'center',
  },
});

export default AddAccountScreen;