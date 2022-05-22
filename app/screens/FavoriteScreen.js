import { StyleSheet, Text, View,  KeyboardAvoidingView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen } from '../components';
import { AppForm, AppFormField, SelectFromField, SubmitButton, DateSelectField, CalendarSeelectField, CustomSelect, ErrorMessage } from '../components/forms';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  myPet: Yup.string().required().label("MyPet"),
})

const kindOfPet = [
  { label: "Dog", value: "Dog" },
  { label: "Cat", value: "Catt" },
  { label: "Rodent", value: "Rodent" },
  { label: "Bird", value: "Bird" },
  { label: "Fish", value: "Fish" },
  { label: "Reptiles", value: "Reptiles" },
  ];

export default function FavoriteScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const handleSubmit =  (info ) => {
    try {
      console.log('ok')
      console.log(info.myPet)
      
    }
    catch(error){
      console.log('ntok')
      

    }
    
  }

  return (
    <>
    <ActivityIndicator visible={loading}/>
     <Screen style={styles.container} >
      <KeyboardAvoidingView  behavior="position" keyboardVerticalPosition={Platform.OS === "ios" ? 0: 40}>
      <AppForm
      initialValues={{myPet: "",}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
        <ErrorMessage error="Invalid email and/or password" visible={loginFailed} />
              {/* <AppFormField
                icon="email"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="myPet"
                name="myPet"
              /> */}
                <SelectFromField name="myPet" arr={kindOfPet} text="Choose the animal"/>
              <SubmitButton title="LOGIN"/>
            </AppForm>
            </KeyboardAvoidingView>
          </Screen>
    </>
  )
}

const styles = StyleSheet.create({})


