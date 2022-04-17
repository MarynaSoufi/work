import React from 'react';
import { useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';
import TextInputField from './TextInputField';
import { StyleSheet, Text, Platform  } from 'react-native';
import color from '../../config/colors';

export default function AppFormField({name, text, ...otherProps}) {
  const{ handleChange, errors, setFieldTouched, touched  } = useFormikContext();
  return (
  <>
  {text && <Text style={styles.text}>Enter your {text}</Text>}

    <TextInputField 
      onBlur={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      {...otherProps}
    />
    <ErrorMessage error={errors[name]} visible={touched[name]}/>
  </>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
  }
})
