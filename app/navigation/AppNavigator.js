import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';  
import { navigate } from './rootNavigation';
import SettingsNavigation from './SettingsNavigatior';
import { ChatScreen, FavoriteScreen, HomeScreen, SettingsScreen } from '../screens';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  return (
  <Tab.Navigator 
    screenOptions={() => ({
      headerShown: false,
      tabBarOptions:{
        style: {
          borderTopWidth: 0, 
          borderTopColor: "transparent"
        }
    },
      tabBarStyle:{
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        height: 70,
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "home-sharp" : "home-outline"} size={size} color={colors.green}/>)})}/>
    <Tab.Screen name="Favorite" component={FavoriteScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "md-paw" : "md-paw-outline"} size={24} color={colors.green} />)})}/>
    <Tab.Screen name="Chat" component={ChatScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color={colors.green} />)})}/>
    <Tab.Screen name="SettingsScreen" component={SettingsNavigation} options={({navigation}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={colors.green} />)})}/>
  </Tab.Navigator>
)
}

export default AppNavigator;
