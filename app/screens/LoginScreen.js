import { StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { ErrorMessage } from '../components/forms';
import { AppForm, AppFormField, SubmitButton } from '../components/forms/';
import { useAuth } from '../firebase/auth';
import { ActivityIndicator, Screen } from '../components';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
})

export default function LoginScreen() {
  const {login} = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ( {email, password} ) => {
    try {
      setLoading(true);
     await login(email, password)
      
    }
    catch(error){
      setLoginFailed(true);
      setLoading(false);

    }
    
  }
  return (
    <>
    <ActivityIndicator visible={loading}/>
     <Screen style={styles.container} >
      <KeyboardAvoidingView  behavior="position" keyboardVerticalPosition={Platform.OS === "ios" ? 0: 40}>
      {/* <Image style={styles.logo} source={require('../assets/chat-icon.png')}/> */}
      <AppForm
      initialValues={{email: "", password: ""}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
        <ErrorMessage error="Invalid email and/or password" visible={loginFailed} />
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
              <SubmitButton title="LOGIN"/>
            </AppForm>
            </KeyboardAvoidingView>
          </Screen>
    </>
  )
}

const styles = StyleSheet.create({})