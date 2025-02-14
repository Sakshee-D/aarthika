import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-native';
import * as Speech from 'expo-speech';

export default function LoginScreen() {
  const { state } = useLocation(); // To access the passed language from LandingScreen
  const selectedLanguage = state?.language || 'English'; // Default to 'English' if no language is passed
  const [aadhar, setAadhar] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle text-to-speech based on selected language
  const speak = (message) => {
    Speech.speak(message, {
      language: selectedLanguage === 'English' ? 'en' : selectedLanguage === 'Hindi' ? 'hi' : 'mr',
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        aadhar: aadhar.trim(),
        pin: pin.trim(),
      });
      setMessage(response.data.message);

      if (response.data.message === 'Login Successful') {
        speak('Login Successful');
        navigate('/dashboard');
      } else {
        speak(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      setMessage(error.response?.data?.message || 'An error occurred.');
      speak('An error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{selectedLanguage === 'English' ? 'Enter Aadhaar Number' : selectedLanguage === 'Hindi' ? 'आधार नंबर दर्ज करें' : 'आधार नंबर प्रविष्ट करा'}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={aadhar}
        onChangeText={setAadhar}
        placeholder={selectedLanguage === 'English' ? 'Enter your Aadhaar' : selectedLanguage === 'Hindi' ? 'अपना आधार दर्ज करें' : 'तुमचा आधार नंबर प्रविष्ट करा'}
      />
      <Text>{selectedLanguage === 'English' ? 'Enter PIN' : selectedLanguage === 'Hindi' ? 'पिन दर्ज करें' : 'पिन प्रविष्ट करा'}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        placeholder={selectedLanguage === 'English' ? 'Enter your PIN' : selectedLanguage === 'Hindi' ? 'अपना पिन दर्ज करें' : 'तुमचा पिन प्रविष्ट करा'}
      />
      <Button title={selectedLanguage === 'English' ? 'Login' : selectedLanguage === 'Hindi' ? 'लॉग इन' : 'लॉग इन करा'} onPress={handleLogin} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '80%',
  },
});
