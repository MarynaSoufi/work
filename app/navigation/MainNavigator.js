import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, MatchScreen } from '../screens';


const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator screenOptions={{
    headerShown:false,
    // presentation: "modal"
  }}>
    <Stack.Screen name="Main" component={MainScreen} />
     <Stack.Screen name="Match" component={MatchScreen} />
  </Stack.Navigator>
 
)

export default MainNavigation;