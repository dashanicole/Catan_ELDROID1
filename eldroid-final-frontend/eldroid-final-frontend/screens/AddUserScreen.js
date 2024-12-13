import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddUserScreen({ route, navigation }) {
  const { onUserAdded } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  //const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const takeProfilePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need permission to access your camera.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      } else {
        Alert.alert('Camera Cancelled', 'You did not take a photo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while taking the photo.');
      console.error('Error taking photo: ', error);
    }
  };

  const handleSave = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    /*
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }*/
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://192.168.43.223:3000/api/users');
      const users = await response.json();

      const existingUser = users.find(
        //No duplicate emails
        (user) => user.email === email.toLowerCase().trim()
      );
      if (existingUser) {
        Alert.alert('Error', 'Email already exists.');
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to connect to the server.');
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email.toLowerCase().trim()); //for consistency, all emails are converted to lowercase
      formData.append('password', password);

      if (profileImage) {
        formData.append('image', {
          uri: profileImage,
          name: 'profile-image.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await fetch('http://192.168.43.223:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add user.');
      }

      Alert.alert('Success', 'User added successfully!');

      if (onUserAdded) onUserAdded();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BALABAT & CATAN</Text>
      </View>
      <View style={styles.contentContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <TouchableOpacity
            style={styles.photoPlaceholder}
            onPress={takeProfilePhoto}>
            <Text style={styles.photoPlaceholderText}>Tap to Add Photo</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SAVE</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ff0000',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoPlaceholderText: {
    color: '#666',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#00b300',
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff0000',
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
});
