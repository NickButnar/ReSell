import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return isAuthenticated;
}
