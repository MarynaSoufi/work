import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen, RegisterScreen, LoginScreen } from '../screens';
import routes from '../navigation/routes';


const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
     <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
     <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
     <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
 
)

export default AuthNavigator;