import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [userN, setUserN] = useState('');
  const [passW, setPassW] = useState('');

  const handleLogin = () => {
    const validUsername = 'admin';
    const validPassword = 'hello123!';

    if (userN === validUsername && passW === validPassword) {
      Alert.alert('Login Success', 'Welcome, you have successfully logged in!');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATAN, Diether</Text>
      </View>
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Username"
          placeholderTextColor="#999"
          onChangeText={setUserN}
          value={userN}
        />
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  form: {
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 100,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 1,
    elevation: 10,
    width: '99.5%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: '40%',
    marginTop: 15,
  },
});