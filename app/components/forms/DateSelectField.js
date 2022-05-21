import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import Button from '../Button.js';

export default function DateSelectField() {
  const{ handleChange, errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Button iconName="microphone"  onPress={showDatePicker} styleBtn={styles.exit} iconSize={24}  iconColor="black"/>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        value={new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
   </>
    
  )
}

const styles = StyleSheet.create({
  exit: {
    marginHorizontal: 5,
  },
})