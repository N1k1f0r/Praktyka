import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getCombinedUsers = () => {
    const localUsers = JSON.parse(localStorage.getItem('spd_registered_users')) || []
    return [...usersData, ...localUsers]
  }
  const [allUsers, setAllUsers] = useState(getCombinedUsers())

  useEffect(() => {
    const savedUser = localStorage.getItem('spd_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(usersData[0]);
    }
  }, []);

  const login = (emailInput, passwordInput) => {
    const foundUser = allUsers.find(
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


  const register = (newUser) => {
    if (allUsers.find(u => u.email === newUser.email)) {
      return false
    }

    const userToAdd = {
      ...newUser,
      id: Date.now(),
      role: 'user'
    }
    const updatedUsers = [...allUsers, userToAdd]
    setAllUsers(updatedUsers)

    const newlyRegistered = updatedUsers.filter(u => !usersData.find(jsonUser => jsonUser.id === u.id))
    localStorage.setItem('spd_registered_users', JSON.stringify(newlyRegistered))

    setUser(userToAdd)
    localStorage.setItem('spd_user', JSON.stringify(userToAdd))

    return true
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);