import axios from 'axios';

export const analyzeBudget = async (data) => {
  try {
    const response = await axios.post(
      'https://api.gemini-ai.com/analyze', // Replace with the actual Gemini AI API endpoint
      data,
      {
        headers: { Authorization: `Bearer AIzaSyAYY_9o5rWiURGQBVPUQp27yEvu_VALyac` },
      }
    );
    return response.data; // Assuming the API returns the analysis as text
  } catch (error) {
    console.error('Error analyzing budget:', error);
    throw new Error('Failed to fetch analysis.');
  }
};
