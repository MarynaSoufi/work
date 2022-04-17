import React from 'react';;
import { Text, View, TouchableWithoutFeedback  } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Button({text, styleBtn, styleText, onPress, iconName, iconSize, iconColor }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
       <View style={styleBtn}>
         {iconName && <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />}
         {text &&  <Text style={styleText}>{text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  )
}
