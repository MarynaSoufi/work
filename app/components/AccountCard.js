import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import color from '../config/colors';
import defaultStyle from '../config/styles';
import { Entypo } from '@expo/vector-icons'; 

export default function AccountCard({title, subtitle, src, IconComponent, onPress}) {
  return (
      <TouchableWithoutFeedback>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {IconComponent}
            {src && <Image style={styles.image} source={src}></Image>}
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{title}</Text>
              {subtitle &&<Text style={styles.sum}>{subtitle}</Text>}
            </View>
          </View>
          <View style={styles.btn}>
            <Entypo onPress={onPress} name="chevron-small-right" size={24} color={color.green}  />
          </View>
        </View>
       
      </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30
  },
  container : {
    alignSelf: "center",
    flexDirection: 'row',
    alignItems:'center',
    padding: 10,
    
  },
  btn: {
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: color.lightGray,
    backgroundColor: color.lightGray,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: 200,
  },
  textWrapper: {
    padding: 20,
  },
  text: defaultStyle.text

  

})
