import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, AuthProvider } from './src/context';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AppProvider>
    </AuthProvider>
  );
}
