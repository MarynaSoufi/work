import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';  
import { navigate } from './rootNavigation';
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
    // headerStyle: {
    //   backgroundColor: colors.mint,
    // },
    // headerTintColor: '#fff',
  >
    <Tab.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "home-sharp" : "home-outline"} size={size} color={colors.green}/>)})}/>
    <Tab.Screen name="Favorite" component={FavoriteScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "md-paw" : "md-paw-outline"} size={24} color={colors.green} />)})}/>
    <Tab.Screen name="Chat" component={ChatScreen} options={({navigation, route}) => ({tabBarIcon: ({ color, size, focused}) => (<Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color={colors.green} />)})}/>
    <Tab.Screen name="Settings" component={SettingsScreen} options={({navigation}) => ({tabBarIcon: ({ color, size}) => (<SimpleLineIcons name="settings" size={24} color={colors.green} />)})}/>
  </Tab.Navigator>
)
}

export default AppNavigator;
