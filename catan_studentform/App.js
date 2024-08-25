import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [idNo, setIdNo] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STUDENT INFORMATION</Text>
      <View style={styles.form}>
        <Text style={styles.label}>ID NO</Text>
        <TextInput style={styles.input} onChangeText={setIdNo} />
        <Text style={styles.label}>NAME</Text>
        <TextInput style={styles.input} onChangeText={setName} />
        <Text style={styles.label}>COURSE</Text>
        <TextInput style={styles.input} onChangeText={setCourse} />
        <Text style={styles.label}>LEVEL</Text>
        <TextInput style={styles.input} onChangeText={setLevel} />
        <Button title="OK" onPress={() => console.log('Button pressed')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 58,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});