"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  _id?: string; // MongoDB document ID
  name: string;
  email: string;
  token?: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  getAuthHeader: () => { Authorization: string } | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Check for stored user data and token on component mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (storedToken) {
          parsedUser.token = storedToken;
        }
        // Ensure user ID is properly restored
        if (!parsedUser.id && parsedUser._id) {
          parsedUser.id = parsedUser._id;
          console.log('Restored user ID from _id:', parsedUser.id);
        }
        if (!parsedUser.id) {
          console.error('No user ID found in stored data:', parsedUser);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          return;
        }
        console.log('Restored user data:', parsedUser);
        console.log('Token from storage:', storedToken);
        console.log('User ID from storage:', parsedUser.id); // Log the ID for verificatio

        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleSetUser = (newUser: User) => {
    console.log('Setting new user:', newUser);
    if (newUser) {
      // Ensure user has an ID (handle both id and _id cases)
      if (!newUser.id && newUser._id) {
        newUser.id = newUser._id;
      } else if (!newUser.id) {
        console.error('User object is missing both id and _id fields');
        throw new Error('User ID is required');
      }
      
      if (newUser.token) {
        // Store token first
        localStorage.setItem('token', newUser.token);
        const userWithoutToken = { ...newUser };
        delete userWithoutToken.token;
        localStorage.setItem('user', JSON.stringify(userWithoutToken));
        console.log('Token stored separately:', newUser.token);
      }
      // Update state after storage is complete
      setUser(newUser);
    } else {
      // Clear storage and state for logout
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const logout = () => {
    // Clear storage first
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Then update state
    setUser(null);
    // Use router for navigation instead of direct window location change
    if (typeof window !== 'undefined') {
      window.location.replace('/');
    }
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return undefined;
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}