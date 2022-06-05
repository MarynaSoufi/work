import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MessageScreen, ChatScreen } from '../screens'


const Stack = createStackNavigator();

const ChatNavigation = () => (
  <Stack.Navigator screenOptions={{
    headerShown:false,
  }}>
     <Stack.Screen name="ChatScreen" component={ChatScreen} />
     <Stack.Screen name="Message" component={MessageScreen}/>
  </Stack.Navigator>
 
)

export default ChatNavigation;