import { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DisplayProfileScreen({ route, navigation }) {
  const { user, onUserUpdated } = route.params;
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [profileImage, setProfileImage] = useState(
    user.image.startsWith('http') ? user.image : `http://192.168.43.223:3000${user.image}`
  );
  const [loading, setLoading] = useState(false);

  // Determine if changes were made
  const hasChanges = useMemo(() => {
    const normalizedProfileImage = profileImage.startsWith('http')
      ? profileImage.replace('http://192.168.43.223:3000', '')
      : profileImage;

    const normalizedUserImage = user.image.startsWith('http')
      ? user.image.replace('http://192.168.43.223:3000', '')
      : user.image;
    //added lowercase and trim method
    return email.toLowerCase().trim() !== user.email || password !== user.password || normalizedProfileImage !== normalizedUserImage;
  }, [email, password, profileImage, user]);

  const updateProfilePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need permission to access your camera.');
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
  
  const handleUpdate = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const normalizedProfileImage = profileImage.startsWith('http') ? profileImage.replace('http://192.168.43.223:3000', '') : profileImage;
      const normalizedUserImage = user.image.startsWith('http') ? user.image.replace('http://192.168.43.223:3000', '') : user.image;

      if (profileImage && normalizedProfileImage !== normalizedUserImage) {
        formData.append('image', {
          uri: profileImage,
          name: 'updated-profile-image.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await fetch(`http://192.168.43.223:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user.');
      }
      Alert.alert('Success', 'Profile updated successfully!');

      if (onUserUpdated) onUserUpdated();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BALABAT & CATAN</Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={updateProfilePhoto}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.updateButton, { opacity: hasChanges && !loading ? 1 : 0.5 }]}
            onPress={handleUpdate}
            disabled={!hasChanges || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>UPDATE</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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
    padding: 28,
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
  updateButton: {
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
