"use client";

import React, { createContext, useState, useContext } from 'react';

interface NameContextProps {
  name: string;
  setName: (name: string) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
}

const NameContext = createContext<NameContextProps | undefined>(undefined);

export const NameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  return (
    <NameContext.Provider value={{ name, setName, profileImage, setProfileImage }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useName must be used within a NameProvider');
  }
  return context;
};