import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';

export default function CalendarSeelectField({tillName, fromName, ...otherProps}) {
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const{ handleChange, errors, setFieldTouched, touched, setFieldValue, values, setValues  } = useFormikContext();
 
  const onDateChange = ( date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      console.log('endate',date)
      setFieldValue( fromName, date);
 
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
      console.log('from',date)
      setFieldValue(tillName, date);
 
    }
  };
  return (
    <View style={styles.container}>
    <CalendarPicker
       startFromMonday={true}
       allowRangeSelection={true}
       format="DD-MM-YYYY"
       minDate={new Date(2022, 1, 1)}
       maxDate={new Date(2050, 6, 3)}
       onDateChange={onDateChange}
       selectedDayColor={colors.mint}
      {...otherProps}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});
