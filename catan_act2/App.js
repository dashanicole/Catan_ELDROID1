import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';

const users = [
  {key: '1', username: 'alpha', password: 'hello123!'},
  {key: '2', username: 'bravo', password: 'hello123!'},
  {key: '3', username: 'charlie', password: 'hello123!'},
  {key: '4', username: 'delta', password: 'hello123!'},
  {key: '5', username: 'echo', password: 'hello123!'},
];

const loginuser = (username, password) => {
  return users.find(u => u.username === username && u.password === password);
};

export default function App() {
  const [userN, setUserN] = useState('');
  const [passW, setPassW] = useState('');

  const handleLogin = () => {
    const user = loginuser(userN, passW);

    if (user) {
      Alert.alert('Login Success', 'Welcome, you have successfully logged in!');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
      setUserN('');
      setPassW('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATAN, Diether</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}> USERNAME </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Username"
          placeholderTextColor="#999"
          onChangeText={setUserN}
          value={userN}
        />
        <Text style={styles.label}> PASSWORD </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Password"
          placeholderTextColor="#999"
          onChangeText={setPassW}
          value={passW}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button title="LOGIN" onPress={handleLogin} color="#00008B" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1A5319',
    padding: 50,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  label:{
    fontSize:18,
    fontWeight:"bold",
    alignItems: 'right',
  },
  form: {
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 50,
    width: '98%',
  },
  buttonContainer: {
    width: '100%',
    height: '40%',
    marginTop: 15,
  },
});