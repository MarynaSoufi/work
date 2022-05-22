import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../config/colors';
import defaultStyles from '../../config/styles';

export default function TextInputField({icon, ...otherProps}) {
  return (
    <View style={styles.container}>
    {icon && <MaterialCommunityIcons name={icon} size={20} color={color.green} style={styles.icon}/>}
      <TextInput style={styles.text} {...otherProps}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "95%",
    padding: 15,
    alignSelf: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: color.orange,
    borderRadius: 15,
  },
  text: defaultStyles.text,
  
  icon: {
    marginTop: 3,
    marginRight: 10,
  }
})
