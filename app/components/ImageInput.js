import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Alert,  TouchableWithoutFeedback   } from 'react-native';
import  * as ImagePicker from 'expo-image-picker';
import color from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ImageInput({ onChangeImage, userImage }) {
  const [image, setImage] = useState();
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!granted) alert("You need to enable the permision for he Camers Roll!!"); 
  }
  useEffect(() => {
    requestPermission();
  }, [])
  const handlePress = () => {
   Alert.alert('Update', 'Are you sure you want to change the avatar?', [
      {text: "Yes", onPress: () => selectImage()},
      {text: "No"}
    ])
 
  }
    const selectImage  = async () => {
      try {
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5
        });
        
        if(!cancelled) {
          onChangeImage(uri);
          setImage(uri);
        }
        
      } catch (error) {
        console.log("Error reading an image", error)
      }
      
    }
  return (
    <TouchableWithoutFeedback  onPress={handlePress}>
        <View style={styles.container}> 
          {!image &&  userImage !== '' &&
          <View style={styles.wrapper}>
          <Image source={{uri:userImage}} style={styles.image}/> 
          <MaterialCommunityIcons  style={styles.icon} color={color.green} name="camera" size={42}/>
          </View>}
          {image  && 
          <View style={styles.wrapper}>
          <Image source={{uri:image}} style={styles.image}/>
           <MaterialCommunityIcons style={styles.icon} color={color.white} name="camera" size={42}/>
           </View>}
          {!image && userImage === '' && <MaterialCommunityIcons color={color.green} name="camera" size={50}/>}
        </View>
    </TouchableWithoutFeedback>
   
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    height: 150,
    width: 150,  
    backgroundColor: color.mainLight,
    overflow:'hidden',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    opacity: 0.9,

  },
  wrapper: {
    height: 150,
    width: 150, 
    position: 'absolute',
    overflow:'hidden',
    position: 'relative',
  },
  icon: {
    zIndex: 3,
    elevation: 3,
    alignSelf: 'center',
    position: 'absolute',
    top: "38%",
  }
})
