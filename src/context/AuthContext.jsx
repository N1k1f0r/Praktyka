import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = nikt nie jest zalogowany

  useEffect(() => {
    const savedUser = localStorage.getItem('spd_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(usersData[0]); 
    }
  }, []);

  const login = (emailInput, passwordInput) => {
    const foundUser = usersData.find(
        (u) => u.email === emailInput && u.password === passwordInput
    );
    
    if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('spd_user', JSON.stringify(foundUser));
        return true;
    }
    return false;
    };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spd_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);