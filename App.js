import React from 'react'
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import { createStackNavigator } from '@react-navigation/stack';
import { navigatonRef } from './app/navigation/rootNavigation';
import AuthNavigator from './app/navigation/AuthNavigator';
import  AppNavigator from './app/navigation/AppNavigator';
import { useAuth, AuthProvider } from './app/firebase/auth';
import 'react-native-gesture-handler';
import ignoreWarnings from 'ignore-warnings';


const Stack = createStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])

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
