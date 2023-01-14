import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
  
      <AuthProvider>
        <Routes />
      </AuthProvider>
    
  );
}