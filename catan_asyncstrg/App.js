import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import AddAccountScreen from './screens/AddAccountScreen';

// Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const addDefaultUser = async () => {
      const storedAccounts = JSON.parse(await AsyncStorage.getItem('accounts')) || [];
      if (storedAccounts.length === 0) {
        const defaultAccount = { email: 'alpha@uc.edu.ph', password: '12345' };
        const updatedAccounts = [...storedAccounts, defaultAccount];
        await AsyncStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        console.log('Default user added');
      }
    };

    addDefaultUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'CATAN, Diether D.',
            headerStyle: { backgroundColor: '#d32f2f' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
          }}
        />

        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={({ navigation }) => ({
            title: 'CATAN, Diether',
            headerStyle: { backgroundColor: '#d32f2f' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AddAccount')} style={{      marginRight: 20 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>+</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen 
          name="AddAccount" 
          component={AddAccountScreen} 
          options={{
            title: 'CATAN, Diether D.',
            headerStyle: { backgroundColor: '#d32f2f' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;