import React from 'react'
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ListItemDeleteAction({onPress, text, size, color}) {
  return (
    <TouchableWithoutFeedback 
      style={styles.container}
      onPress={onPress}
  >
    <View style={styles.wrapper}>
      <MaterialCommunityIcons name={text} size={size} color={color} />
    </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",

  }
})
