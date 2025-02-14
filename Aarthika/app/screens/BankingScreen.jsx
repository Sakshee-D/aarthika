import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native'; // For navigation
import axios from 'axios';

export default function BankingScreen() {
  const [password, setPassword] = useState('');
  const [aadhar, setAadhar] = useState(''); // Store the Aadhar of the user for validation
  const navigate = useNavigate();

  // Handle password submission
  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/validate_password', { aadhar, pin: password });

      if (response.data.success) {
        // Navigate to the Send Money screen on success
        navigate('/banking');
      } else {
        Alert.alert('Invalid Password', response.data.message || 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while validating the password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Password to Access Banking</Text>
      <TextInput
        style={styles.input}
        value={aadhar}
        onChangeText={setAadhar}
        placeholder="Enter your Aadhar"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
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