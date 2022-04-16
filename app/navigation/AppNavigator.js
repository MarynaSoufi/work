import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../config/colors';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';  
import { navigate } from './rootNavigation';
import { ChatScreen, FavoriteScreen, HomeScreen, SettingsScreen } from '../screens';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  return (
  <Tab.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: color.mint,
    },
    headerTintColor: '#fff',
  }}>
    <Tab.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size}) => (<FontAwesome name="home" size={size} color="black"/>)})}/>
    <Tab.Screen name="Favorite" component={FavoriteScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size}) => (<Ionicons name="paw" size={24} color="black" />)})}/>
    <Tab.Screen name="Chat" component={ChatScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size}) => (<FontAwesome name="wechat" size={24} color="black" />)})}/>
    <Tab.Screen name="Settings" component={SettingsScreen} options={({navigation}) => ({tabBarIcon: ({ color, size}) => (<SimpleLineIcons name="settings" size={24} color="black" />)})}/>
  </Tab.Navigator>
)
}

export default AppNavigator;
