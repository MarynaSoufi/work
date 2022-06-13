import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function AppButton({text, styleBtn, styleText, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View  style={styleBtn} accessibilityRole='button'>
          <Text style={styleText}>{text}</Text>
        </View>
    </TouchableOpacity>
    
   )
}

const styles = StyleSheet.create({})
