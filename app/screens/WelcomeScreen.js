import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from '../components';
import colors from '../config/colors';
import routes from '../navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/bird.jpg")}/>
      <View style={styles.btn_wrapper}>
      {/* <MaterialCommunityIcons onPress={() => navigation.navigate("Login")} name="login" size={42} color={colors.mint} /> */}
      {/* <MaterialCommunityIcons onPress={() => navigation.navigate("Register")} name="registered-trademark" size={42} color={colors.mint} /> */}
      <Button styleBtn={styles.loginBtn} styleText={styles.loginText} text="LOGIN" onPress={() => navigation.navigate("Login")} name="login" size={42} color={colors.mint}/>
      <Button styleBtn={styles.registerBtn} styleText={styles.loginText} text="REGISTER" onPress={() => navigation.navigate("Register")} name="registered-trademark" size={42} color={colors.mint}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  image: {
   width:400,
   height:400, 
  },
  btn_wrapper: {
    width:"100%",
    paddingHorizontal: 20,
    marginTop: 150
    
   },
  loginBtn: {
    backgroundColor:colors.orange,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 15,
    marginBottom: 20,
  },
  loginText: {
    color: "white",
  },
  registerBtn: {
    backgroundColor: colors.green,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 15,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Courier",
    fontSize: 18,

  }
})