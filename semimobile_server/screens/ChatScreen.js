import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import axios from 'axios';

const ChatScreen = ({ route }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { username } = route.params;
  const flatListRef = useRef(null); // Ref for FlatList

  const serverUrl = "http://192.168.68.104:3000/"; // Change to your IP or localhost as needed

  useEffect(() => {
    const fetchMessages = () => {
      axios.get(`${serverUrl}messages`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    };

    fetchMessages(); // Initial fetch
    const intervalId = setInterval(fetchMessages, 2000); // Poll every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Auto-scroll to the latest message when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const trimmedMessage = message.trim();
      axios.get(`${serverUrl}send?name=${encodeURIComponent(username)}&text=${encodeURIComponent(trimmedMessage)}`)
        .then(response => {
          setMessages(prevMessages => [...prevMessages, response.data]);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                <Text style={styles.bold}>{item.name}:</Text> {item.text}
              </Text>
            </View>
          )}
          style={styles.messageList}
          contentContainerStyle={{ paddingBottom: 10 }}
          persistentScrollbar={true} // Enable persistent scrollbar for Android
          showsVerticalScrollIndicator={true} // Enable scroll indicator for iOS
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your message here"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            onSubmitEditing={handleSendMessage} // Allow sending via Enter/Return key
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    paddingVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  messageText: {
    fontSize: 17,
  },
  bold: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    color: 'black',
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;