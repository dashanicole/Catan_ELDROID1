import { Text, View, TextInput, StyleSheet } from 'react-native';
import {useState} from 'react';

export default function App() {
  const [name,setName] = useState("Dit");
  const [age,setAge] = useState("22");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}> NAME </Text>
        <TextInput style={styles.input}
          //placeholder = "Enter your name"
          onChangeText={(value)=>setName(value)}
        />
        <Text style={styles.label}> AGE </Text>
        <TextInput style={styles.input}
          //placeholder = "Enter your age"
          onChangeText={(value)=>setAge(value)}
          //secureTextEntryonChangeText={(value)=>setAge(value)}
        />
        <Text style={styles.label}>
          My name is {name} and my age is {age}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"grey",
    justifyContent:"center",
  },
  input:{
    height:58,
    borderRadius:5,
    borderWidth:1, 
    borderColor:"#ddd",
    padding:20,
  },
  label:{
    fontSize:12,
    fontWeight:"bold",
  },
  form:{
    backgroundColor:"white",
    margin:20,
    paddingHorizontal:20,
    paddingVertical:10,
    borderColor:"#707070",
    borderRadius:10,
  },
});