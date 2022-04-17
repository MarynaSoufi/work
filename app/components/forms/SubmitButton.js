import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { useFormikContext } from 'formik';
import AppButton  from '../AppButton';
import colors from '../../config/colors';

export default function SubmitButton({title}) {
  const{ handleSubmit } = useFormikContext();
  return (
    <AppButton text={title} styleBtn={styles.loginBtn} styleText={styles.text} onPress={handleSubmit}/>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Courier",
    fontSize: 18,
  },
  loginBtn: {
    backgroundColor: colors.yellow,
    width: "95%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius:15,
    marginVertical: 10,
    alignSelf:"center"
  },
})
