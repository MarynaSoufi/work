import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen, OnboardingScreen }  from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import { createStackNavigator } from '@react-navigation/stack';
import { navigatonRef } from './app/navigation/rootNavigation';
import AuthNavigator from './app/navigation/AuthNavigator';
import  AppNavigator from './app/navigation/AppNavigator';
import { useAuth, AuthProvider } from './app/firebase/auth';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const {user} = useAuth();

  return (
    <>
    <NavigationContainer ref ={navigatonRef} theme={navigationTheme}>
      {user ? (<AppNavigator /> ) : (<AuthNavigator />)}
    </NavigationContainer>
    </>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
