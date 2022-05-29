import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';
import color from '../../config/colors';

export default function CalendarSeelectField({name, tillName, fromName, text,  ...otherProps}) {
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const{ errors,  touched, setFieldValue } = useFormikContext();
 
  const onDateChange = ( date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setFieldValue( tillName, date);
 
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
      setFieldValue(fromName, date);
 
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <ErrorMessage error={errors?.dates?.till} visible={errors?.dates?.till}/>
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
    width: "99%",
    alignSelf: 'center',
    marginVertical:20,
    padding:10,
    borderWidth: 2,
    borderColor: color.white,
    borderRadius:15,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    // marginVertical:20,
    // padding:10,
    // borderWidth: 2,
    // borderColor: colors.orange,
    // borderRadius:15,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: color.white,
    marginBottom: 10,
    backgroundColor: colors.orange,
    width: "100%",
    paddingVertical: 5,
    borderRadius: 5
  }
});
