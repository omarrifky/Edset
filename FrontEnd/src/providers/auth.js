import React, { createContext, useEffect, useState } from 'react';
import UsersService from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [refetchOrder, setRefetchOrder] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      (async () => {
        const user = await AsyncStorage.getItem("user")
        if(user) setUser(JSON.parse(user))
        else setUser(null)
        
        const token = await AsyncStorage.getItem("token")
        token && setToken(token)
      })()
    } catch(e) {
    }
  }, [AsyncStorage])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        favorites,
        setFavorites,
        address,
        setAddress,
        cart,
        setCart,
        orders,
        setOrders,
        refetchOrder,
        setRefetchOrder,
        login: async (email, password) => {
          return UsersService.login({email, password});
        },
        register: async body => {
          return UsersService.register({...body});
        },
        logout: async () => {
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('token');
          return UsersService.logout();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
