import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-native'; // Use useLocation to access passed language
import * as Speech from 'expo-speech';

export default function RegisterScreen() {
  const { state } = useLocation(); // To access the selected language passed from LandingScreen
  const selectedLanguage = state?.language || 'English'; // Default to English if no language passed
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

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        aadhar,
        pin,
      });
      setMessage(response.data.message);
      if (response.data.message === 'Registration Successful') {
        speak('Registration Successful');
        navigate('/dashboard');
      } else {
        speak(response.data.message);
      }
    } catch (error) {
      setMessage('User already exists');
      speak('User already exists');
    }
  };

  // Function to simulate Aadhaar scanning
  const scanAadhar = () => {
    speak('Scanning Aadhaar');
    // You can later integrate actual Aadhaar scanning logic here
  };

  useEffect(() => {
    speak(selectedLanguage === 'English' ? 'Create your Aadhaar account' : selectedLanguage === 'Hindi' ? 'अपना आधार खाता बनाएं' : 'तुमचा आधार खाते तयार करा');
  }, [selectedLanguage]);

  return (
    <View style={styles.container}>
      <Text>{selectedLanguage === 'English' ? 'Create Aadhaar Account' : selectedLanguage === 'Hindi' ? 'आधार खाता बनाएं' : 'आधार खाते तयार करा'}</Text>

      <Text>{selectedLanguage === 'English' ? 'Enter Aadhaar Number' : selectedLanguage === 'Hindi' ? 'आधार नंबर दर्ज करें' : 'आधार नंबर प्रविष्ट करा'}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={aadhar}
        onChangeText={setAadhar}
        placeholder={selectedLanguage === 'English' ? 'Enter your Aadhaar' : selectedLanguage === 'Hindi' ? 'अपना आधार दर्ज करें' : 'तुमचा आधार नंबर प्रविष्ट करा'}
      />

      <Text>{selectedLanguage === 'English' ? 'Set PIN' : selectedLanguage === 'Hindi' ? 'पिन सेट करें' : 'पिन सेट करा'}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        placeholder={selectedLanguage === 'English' ? 'Set your PIN' : selectedLanguage === 'Hindi' ? 'अपना पिन सेट करें' : 'तुमचा पिन सेट करा'}
      />

      <Button title={selectedLanguage === 'English' ? 'Register' : selectedLanguage === 'Hindi' ? 'रजिस्टर करें' : 'रजिस्टर करा'} onPress={handleRegister} />

      <Button
        title={selectedLanguage === 'English' ? 'Scan Aadhaar' : selectedLanguage === 'Hindi' ? 'आधार स्कैन करें' : 'आधार स्कॅन करा'}
        onPress={scanAadhar}
      />

      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '80%',
  },
});
