import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import ErrorMessage from './ErrorMessage';

export default function SelectFromField({text, name, arr, ...otherProps}) {
  
  const{ handleChange, errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext();
 const value = values.name
  return (
    
    <>
      {text && <Text style={styles.text}>{text}</Text>}
      <RNPickerSelect
        onValueChange={(value) => setFieldValue(name, value)}
        // selectedValue={() => setFieldValue(values[name])}
        onBlur={()=> setFieldTouched(name, true)}
        value={value}
        //   pickerProps={{
        //     accessibilityLabel: arr.title,
        // }}
        items={arr} />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        
    </>
    
  )
}

const styles = StyleSheet.create({})