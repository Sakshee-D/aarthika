import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native'; 
import { useBudget } from './BudgetContext'; // Import the custom hook

export default function BudgetScreen() {
  const { totalBudget, setTotalBudget, goal, setGoal, savings, setSavings } = useBudget(); // Access context values
  const [totalAmount, setTotalAmount] = useState(totalBudget);
  const [savingsInput, setSavingsInput] = useState(savings);

  const navigate = useNavigate();

  const handleAnalyze = () => {
    // Ensure that totalAmount is a valid number greater than 0
    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert('Please enter a valid total amount greater than 0.');
      return;
    }

    setTotalBudget(totalAmount); // Update totalBudget in context

    navigate('/analyzeBudget', {
      state: {
        goal,
        totalAmount: totalAmount,
        savings: parseFloat(savingsInput) || 0,  // Ensure savingsInput is a number
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set Budget Goal</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        placeholder="Enter your goal"
      />
      <TextInput
        style={styles.input}
        value={totalAmount}  // Use totalAmount directly without converting to string
        onChangeText={(value) => setTotalAmount(parseFloat(value) || 0)}  // Ensure number input
        placeholder="Total Amount"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={savingsInput}  // Use savingsInput directly without converting to string
        onChangeText={(value) => setSavingsInput(parseFloat(value) || 0)}  // Ensure number input
        placeholder="Target Monthly Savings"
        keyboardType="numeric"
      />
      <Button title="Budget Tracking" onPress={handleAnalyze} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
