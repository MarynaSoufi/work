import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Select from 'react-select';
import { useFormikContext } from 'formik';

export default function CustomSelect({   options,   value }) {
  // const{ handleChange, errors, setFieldTouched, touched, setFieldValue  } = useFormikContext();
  // const defaultValue = (options, value) => {
  //   return options ? options.find(option=>option.value === value) : ""
  // }
  return (
    <View>
      {/* <Select
       value={defaultValue(options, value)}
      //  onChange={ value=>setFieldValue('myAnimal', value.value)}
       options={options} /> */}
    </View>
  )
}

const styles = StyleSheet.create({})