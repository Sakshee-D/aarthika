

import React from 'react';
import { AppRegistry } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { BudgetProvider } from './screens/BudgetContext'; // Import BudgetProvider
import { LanguageProvider } from './screens/LanguageContext'; // Import the LanguageProvider
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen'; 
import BankingScreen from './screens/BankingScreen';
import BudgetScreen from './screens/BudgetScreen';
import AnalyzeBudgetScreen from './screens/AnalyzeBudgetScreen';
import HelpGemini from './screens/HelpGemini';

export default function App() {
  return (
 
    <NativeRouter>
      
        
      
      {/* Wrap the app with BudgetProvider */}
      <BudgetProvider>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/banking" element={<BankingScreen />} />
          <Route path="/budget" element={<BudgetScreen />} />
          <Route path="/help" element={<HelpGemini />} />
          <Route path="/analyzeBudget" element={<AnalyzeBudgetScreen />} />
        </Routes>
      </BudgetProvider>
      
    </NativeRouter>
    
  );
}

AppRegistry.registerComponent('AarthikaApp', () => App);
