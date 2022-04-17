import { StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../firebase/auth';
import { ActivityIndicator, Screen } from '../components';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  name: Yup.string().required().label("Name"),
})

export default function RegisterScreen() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();


  const handleSubmit = async ( {name, email, password} ) => {
    try {
      setLoading(true);
      await register(name, email, password);
    }
    catch(error){
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <>
    <ActivityIndicator visible={loading}/>
     <Screen style={styles.container}>
       <KeyboardAvoidingView behavior="position" keyboardVerticalPosition={Platform.OS === "ios" ? 0: 50}>
       <Image style={styles.logo} source={require('../assets/icon.png')}/>
       <AppForm
       initialValues={{email: "", password: "", name:""}}
       onSubmit={handleSubmit}
       validationSchema={validationSchema}>
         <ErrorMessage error={error} visible={error} />
              <AppFormField
                icon="account"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Name"
                name="name"
                textContentType="name"
              />
              <AppFormField
                icon="email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                name="email"
                textContentType="emailAddress"
              />
               <AppFormField
                icon="lock"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                name="password"
                textContentType="password"
                secureTextEntry
              />
              <SubmitButton title="Register"/>
       </AppForm>
       </KeyboardAvoidingView>
     </Screen>
     </>
  )
}

const styles = StyleSheet.create({})