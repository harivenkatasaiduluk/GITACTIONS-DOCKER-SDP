import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) 
{
  // Load initial state from localStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(() => {
    return localStorage.getItem('isBuyerLoggedIn') === 'true';
  });
  
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(() => {
    return localStorage.getItem('isFarmerLoggedIn') === 'true';
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isBuyerLoggedIn', isBuyerLoggedIn);
    localStorage.setItem('isFarmerLoggedIn', isFarmerLoggedIn);
  }, [isAdminLoggedIn, isBuyerLoggedIn, isFarmerLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isBuyerLoggedIn,
        setIsBuyerLoggedIn,
        isFarmerLoggedIn,
        setIsFarmerLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);