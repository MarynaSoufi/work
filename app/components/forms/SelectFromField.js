import { StyleSheet, Text, Platform, Image, View } from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import ErrorMessage from './ErrorMessage';
import { AntDesign } from '@expo/vector-icons'; 
import color from '../../config/colors';
export default function SelectFromField({text, name, arr, ...otherProps}) {
  
  const{ errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext();
 const value = values.name
  return (
    
    <View style={styles.container}>
      {text && <Text style={styles.text}>{text}</Text>}
      <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      style={pickerStyle}
      Icon={() => {
        return <AntDesign name="caretdown" size={14} color={color.green} />;
      }}
        onValueChange={(value) => setFieldValue(name, value)}
        onBlur={()=> setFieldTouched(name, true)}
        value={value}
        items={arr} />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        
    </View>
    
  )
}

const pickerStyle = {
	inputIOS: {
		color: color.text,
		paddingTop: 13,
		paddingBottom: 12,
    width: "100%",
    fontSize: Platform.OS === "android" ? 16 : 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    borderRadius:15,
    marginVertical: 10,
    alignSelf:"center"
	},
	inputAndroid: {
		color: color.text,
    backgroundColor: color.lightGray,
    padding: 10,
    fontSize: Platform.OS === "android" ? 16 : 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    width: "100%",
    borderRadius:15,
    marginVertical: 10,
    alignSelf:"center"
  
	},
  iconContainer: {
    top: 25,
    right: 20,
  },
};
const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: color.orange,
    width: "100%",
    paddingVertical: 5,
    borderRadius: 5
  },
  container: {
    marginVertical:20,
    padding:10,
    borderWidth: 2,
    borderColor: color.orange,
    borderRadius:15,
  },
})