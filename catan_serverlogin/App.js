import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            title: 'Catan, Diether D.',
            headerStyle: { backgroundColor: 'red' },
            headerTintColor: 'white', 
            headerTitleStyle: { fontWeight: 'bold' }, 
          }} 
        />

        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{
            title: 'Catan, Diether D.',
            headerStyle: { backgroundColor: 'red' },
            headerTintColor: 'white', 
            headerTitleStyle: { fontWeight: 'bold' }, 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;