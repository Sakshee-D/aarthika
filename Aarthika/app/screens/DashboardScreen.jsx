import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native'; 
import { Ionicons } from '@expo/vector-icons'; // For the notification bell icon
import * as Speech from 'expo-speech'; // Import expo-speech for TTS

export default function DashboardScreen() {
  const { state } = useLocation(); // To access the passed language from LoginScreen
  const selectedLanguage = state?.language || 'English'; // Default to 'English' if no language is passed
  const navigate = useNavigate();

  // Function to speak the provided text in selected language
  const handleSpeech = (text) => {
    try {
      Speech.speak(text, {
        language: selectedLanguage === 'English' ? 'en' : selectedLanguage === 'Hindi' ? 'hi' : 'mr',
      });
    } catch (err) {
      console.error('Error speaking text:', err);
    }
  };

  useEffect(() => {
    // Speak the welcome message and tagline when the component mounts
    handleSpeech('Welcome to Arthika! Arthika: Support at every step');
  }, [selectedLanguage]);

  return (
    <ScrollView style={styles.container}>
      {/* Notification Bell */}
      <View style={styles.notificationIcon}>
        <Ionicons name="notifications-outline" size={30} color="black" />
      </View>

      {/* Welcome Message with Tagline */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome to Arthika!</Text>
        <Text style={styles.tagline}>Arthika: Support at every step</Text>
        {/* Button to read the welcome message */}
        <TouchableOpacity onPress={() => handleSpeech('Welcome to Arthika! Arthika: Support at every step')}>
          <Text>Speak Welcome</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Go to:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigate('/banking', { state: { language: selectedLanguage } });
              handleSpeech('Banking');
            }}
          >
            <Text>Banking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigate('/budget', { state: { language: selectedLanguage } });
              handleSpeech('Budget');
            }}
          >
            <Text>Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigate('/investment', { state: { language: selectedLanguage } });
              handleSpeech('Investment');
            }}
          >
            <Text>Investment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigate('/education', { state: { language: selectedLanguage } });
              handleSpeech('Learn');
            }}
          >
            <Text>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigate('/help', { state: { language: selectedLanguage } });
              handleSpeech('Help');
            }}
          >
            <Text>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Feedback Section */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => {
          navigate('/feedback', { state: { language: selectedLanguage } });
          handleSpeech('Give Feedback');
        }}
      >
        <Text style={styles.feedbackText}>Give Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeCard: {
    backgroundColor: '#f4a261',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    padding: 15,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
  },
  notificationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  feedbackButton: {
    padding: 15,
    backgroundColor: '#d35400',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
  },
});
