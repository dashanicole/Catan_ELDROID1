import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import AddUserScreen from './screens/AddUserScreen';
import UserListScreen from './screens/UserListScreen';
import DisplayProfileScreen from './screens/DisplayProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DisplayProfile" component={DisplayProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
