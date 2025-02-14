import React, { createContext, useState, useContext } from 'react';

// Create a context for the language
const LanguageContext = createContext();

// Create a custom hook to access the language context
export const useLanguage = () => useContext(LanguageContext);

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language is English

  // Function to change the language
  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
