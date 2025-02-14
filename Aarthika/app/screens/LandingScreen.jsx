import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';

export default function LandingScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigate = useNavigate();

  // Function to handle text-to-speech based on selected language
  const speak = () => {
    let languageText;

    switch (selectedLanguage) {
      case 'Hindi':
        languageText = 'आर्थिका में आपका स्वागत है';
        break;
      case 'Marathi':
        languageText = 'आर्थिका मध्ये आपले स्वागत आहे';
        break;
      default:
        languageText = 'Welcome to Aarthika';
        break;
    }

    Speech.speak(languageText, {
      language: selectedLanguage === 'English' ? 'en' : selectedLanguage === 'Hindi' ? 'hi' : 'mr',
    });
  };

  // Function to display the title text based on selected language
  const getTitleText = () => {
    switch (selectedLanguage) {
      case 'Hindi':
        return 'आर्थिका में आपका स्वागत है';
      case 'Marathi':
        return 'आर्थिका मध्ये आपले स्वागत आहे';
      default:
        return 'Welcome to Aarthika';
    }
  };

  useEffect(() => {
    speak();
  }, [selectedLanguage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getTitleText()}</Text>
      
      {/* Language selection dropdown */}
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Hindi" value="Hindi" />
        <Picker.Item label="Marathi" value="Marathi" />
      </Picker>

      <Button title="Login" onPress={() => navigate('/login', { state: { language: selectedLanguage } })} />
      <Button title="Create Account" onPress={() => navigate('/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    marginVertical: 20,
  },
});
