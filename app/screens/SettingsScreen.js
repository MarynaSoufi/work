import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import colors from '../config/colors';

export default function SettingsScreen() {
  const {user, logout} = useAuth()
  return (
    <View>
      <Text>SettingsScreen</Text>
      <MaterialCommunityIcons onPress={() =>{firestore.collection('users').doc(user.uid).update({
          status: 'offline'
        }), logout()}} name="login" size={42} color={colors.mint} />

    </View>
  )
}

const styles = StyleSheet.create({})