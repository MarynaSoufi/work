import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';

export default function CalendarSeelectField({tillName, fromName, text,  ...otherProps}) {
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const{ handleChange, errors, setFieldTouched, touched, setFieldValue, values, setValues  } = useFormikContext();
 
  const onDateChange = ( date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setFieldValue( fromName, date);
 
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
      setFieldValue(tillName, date);
 
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.wrapper}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        format="DD-MM-YYYY"
        minDate={new Date()}
        maxDate={new Date(2050, 6, 3)}
        onDateChange={onDateChange}
        selectedDayColor={colors.yellow}
        width={320}
        {...otherProps}
      />
  </View>
    </View>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    width: "100%",
    
  },
  container: {
    marginVertical:20,
    padding:10,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius:15,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: colors.orange,
    width: "100%",
    paddingVertical: 5,
    borderRadius: 5
  }
});
