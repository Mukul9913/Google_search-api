import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
// const baseUrl = 'https://google-search72.p.rapidapi.com';
const baseUrl = 'https://google-search3.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Mukul');

  const getResult = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${type}`, {
        method: 'GET',
        image:'true',
        headers: {
          'x-rapidapi-key': 'cb0374b73dmsh3f6bf5f00e24b3ap1a5c88jsn0b18c321a7f0',
          'x-rapidapi-host': 'google-search72.p.rapidapi.com'
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data, 'datattat');
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResultContext.Provider value={{ getResult, result, searchTerm, setSearchTerm, loading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
