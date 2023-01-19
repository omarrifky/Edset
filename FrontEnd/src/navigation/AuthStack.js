import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const GuestStack = createStackNavigator();

export default function AuthStack() {
  return (
    <GuestStack.Navigator initialRouteName='Login' headerMode='none'>
      <GuestStack.Screen name='Login' component={LoginScreen} />
      <GuestStack.Screen name='Signup' component={SignupScreen} />
      <GuestStack.Screen name='Home' component={HomeScreen} />
    </GuestStack.Navigator>
  );
}