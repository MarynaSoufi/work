import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import color from '../../config/colors';

export default function ErrorMessage({error, visible}) {
  if(!visible || !error) return null;
  return (
    <View>
      <Text style={styles.text}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: color.red,
    padding: 10,

  }
})
