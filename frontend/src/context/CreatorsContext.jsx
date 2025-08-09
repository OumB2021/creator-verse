import { createContext, useContext, useState, useEffect } from 'react';

const CreatorsContext = createContext();

export const CreatorsProvider = ({ children }) => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://creator-verse.onrender.com/creators");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", typeof data);
        throw new Error(
          "Expected an array of creators but got something else"
        );
      }

      setCreators(data);
    } catch (error) {
      console.error("Error in fetchCreators:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <CreatorsContext.Provider value={{ creators, loading, refreshCreators: fetchCreators }}>
      {children}
    </CreatorsContext.Provider>
  );
};

export const useCreators = () => {
  const context = useContext(CreatorsContext);
  if (!context) {
    throw new Error('useCreators must be used within a CreatorsProvider');
  }
  return context;
};
