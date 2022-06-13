import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, RequestsScreen, SettingsScreen, OffersScreen } from '../screens';


const Stack = createStackNavigator();

const SettingsNavigation = () => (
  <Stack.Navigator screenOptions={{
    headerShown:false,
    // presentation: "modal"
  }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
     <Stack.Screen name="Profile" component={ProfileScreen} />
     <Stack.Screen name="Requests" component={RequestsScreen}/>
     <Stack.Screen name="Offers" component={OffersScreen}/>
  </Stack.Navigator>
 
)

export default SettingsNavigation;