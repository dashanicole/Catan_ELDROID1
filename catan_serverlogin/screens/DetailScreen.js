import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.detailSection}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <Image source={{ uri: `http://localhost:5000/${user.image}` }} style={styles.detailIcon} />
        {/* Username */}
        <Text style={styles.username}>Username: {user.username}</Text>
        <Text style={styles.username}>Password: {user.password}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  detailIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailScreen;