import React, { createContext, useState } from 'react';
import UsersService from '../services/users';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        favorites,
        setFavorites,
        cart,
        setCart,
        orders,
        setOrders,
        login: async (email, password) => {
          return UsersService.login({ email, password });
        },
        register: async body => {
          return UsersService.register({ ...body });
        },
        logout: async () => {
          return UsersService.logout();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
