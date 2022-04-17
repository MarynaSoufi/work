import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from '../components';
import colors from '../config/colors';
import routes from '../navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomeScreen({navigation}) {

  return (
    <View>
      {/* <Image style={styles.image} source={require("../assets/icon.png")}/> */}
      <View style={styles.btn_wrapper}>
      <MaterialCommunityIcons onPress={() => navigation.navigate("Login")} name="login" size={42} color={colors.mint} />
      <MaterialCommunityIcons onPress={() => navigation.navigate("Register")} name="registered-trademark" size={42} color={colors.mint} />
        {/* <Button styleBtn={styles.loginBtn} styleText={styles.text} text="LOGIN" onPress={() => navigation.navigate(routes.LOGIN)} ></Button>
        <Button styleBtn={styles.registerBtn} styleText={styles.text} text="REGISTER" onPress={() => navigation.navigate(routes.REGISTER)}></Button> */}
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
   width:300,
   height:300, 
  },
  btn_wrapper: {
    width:"100%",
    paddingHorizontal: 20,
    
   },
  loginBtn: {
    backgroundColor:colors.main,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 15,
    marginBottom: 20,
  }
  ,
  registerBtn: {
    backgroundColor: colors.mainLight,
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