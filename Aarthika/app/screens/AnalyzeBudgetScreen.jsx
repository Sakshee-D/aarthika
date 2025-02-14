import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Keyboard, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useBudget } from './BudgetContext'; // Import the custom hook
import { useNavigate } from 'react-router-native';
export default function AnalyzeBudgetScreen() {
  const { totalBudget, setTotalBudget, savings, setSavings } = useBudget(); // Access global state for totalBudget and savings
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [pieData, setPieData] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const totalExpenses = pieData.reduce(
          (sum, item) => sum + (item.name !== 'Savings' ? item.population : 0),
          0
        );
        const savingsAmount = totalBudget - totalExpenses;
        const data = {
          goal: 'Set your financial goal here',  // Assuming this is stored globally or needs to be set
          actualExpense: totalExpenses,
          savings: Math.max(savingsAmount, 0),
        };
        const result = await analyzeBudget(data);  // Assuming analyzeBudget is an external function
        setAnalysis(result);

        const prompt = "How can I save more money based on my current expenses and income?";



        setGeneratedPrompt(prompt); 

      } catch (error) {
        Alert.alert('Error', 'Failed to analyze the budget.');
      }
    };
    fetchAnalysis();
  }, [pieData, totalBudget]); 
   // Re-run when pieData or totalBudget changes

   const navigateToHelp = () => {
    navigate('/help', { state: { prompt: generatedPrompt } });  // Pass the generated prompt to Help screen
  };

  const addExpenseCategory = () => {
    if (!expenseCategory || !expenseAmount) {
      Alert.alert('Error', 'Please fill in both the expense category and amount.');
      return;
    }
    const expenseAmountValue = parseFloat(expenseAmount);
    if (isNaN(expenseAmountValue) || expenseAmountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid positive number for the expense amount.');
      return;
    }
    // Check if the category already exists
    const existingExpense = pieData.find((item) => item.name === expenseCategory);
    if (existingExpense) {
      Alert.alert('Error', 'Expense category already exists. Please add a different category.');
      return;
    }
    // Add new expense category
    const updatedPieData = [
      ...pieData.filter((item) => item.name !== 'Savings'),
      {
        name: expenseCategory,
        population: expenseAmountValue,
        color: generateRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
    // Calculate new savings
    const totalExpenses = updatedPieData.reduce((sum, item) => sum + item.population, 0);
    const savingsAmount = totalBudget - totalExpenses;
    const savingsEntry = {
      name: 'Savings',
      population: Math.max(savingsAmount, 0),
      color: '#00C853',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
    setPieData([...updatedPieData, savingsEntry]);
    setSavings(Math.max(savingsAmount, 0));
    setExpenseCategory('');
    setExpenseAmount('');
    Keyboard.dismiss();
  };
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Analyze Your Budget</Text>
      <Text style={styles.totalBudgetText}>Total Budget: ₹{totalBudget}</Text>
      <Text style={styles.totalSavingsText}>Total Savings: ₹{savings}</Text>
      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      ) : (
        <Text style={styles.noDataText}>No data available. Add some expenses to see the chart.</Text>
      )}
      <Text style={styles.analysisText}>{analysis || 'Analysis will appear here after fetching.'}</Text>
      <TextInput
        style={styles.input}
        value={expenseCategory}
        onChangeText={setExpenseCategory}
        placeholder="Expense Category"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        placeholder="Expense Amount"
        keyboardType="numeric"
      />
      <Button title="Add Expense" onPress={addExpenseCategory} />
      {/* Add a button to navigate to the Help screen with the prompt */}
      <Button title="Ask Chatbot for Advice" onPress={navigateToHelp} />
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF', // White background
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalBudgetText: {
    fontSize: 18,
    marginVertical: 5,
  },
  totalSavingsText: {
    fontSize: 18,
    marginVertical: 5,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F7F7F',
    textAlign: 'center',
  },
  analysisText: {
    fontSize: 16,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});