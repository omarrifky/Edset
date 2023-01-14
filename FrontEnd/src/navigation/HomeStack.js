import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from './AuthProvider';

const ModalStack = createStackNavigator();

/**
 * All chat app related screens
 */


export default function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='Home' component={HomeScreen} />
    </ModalStack.Navigator>
  );
}