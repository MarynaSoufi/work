import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import color from '../config/colors';

export default function SwitcherItem({title, onPress, isActive, id}) {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.wrapper, {backgroundColor: `${isActive === id ? color.orange : color.lightGray}`}]}>
          <Text style={[styles.text, {color: `${isActive === id ? color.white : color.text}`}]}>{title}</Text>
        </View>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: Platform.OS === "android" ? 12 : 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
    fontWeight: '700'
  },
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: color.lightGray,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10
  }
})