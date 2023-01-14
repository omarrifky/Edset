import React, { createContext, useState } from 'react';


/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
         
        },
        register: async (email, password) => {
        
        },
        logout: async () => {
      
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};