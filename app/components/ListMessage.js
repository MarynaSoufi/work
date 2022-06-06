import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../config/colors';
import { useAuth } from '../firebase/auth'

export default function ListMessage({message, timestamp, src, userName, sendFromId, imageUri, userLocation}) {
  const {user} = useAuth();
  return (
    <View>
    {message &&
      <View style={ sendFromId !== user.uid ? styles.wrapperLeft : styles.wrapperRight }>
        <View style={ sendFromId !== user.uid ? styles.messageContainerLeft : styles.messageContainerRight }>
          <Image style={styles.image} source={src}/>
        
          <View>
            <View style={ sendFromId !== user.uid ? styles.containerLeft : styles.containerRight }>
              <Text style={ sendFromId !== user.uid ? styles.messageLeft : styles.messageRight }>{message}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{new Date(timestamp?.toDate()).toUTCString()}</Text>
      </View>
    
  }
   { imageUri && <View style={ sendFromId !== user.uid ? styles.imageContainerLeft : styles.imageContainerRight }>
      <View style={styles.userContainer}>
          <Text style={styles.user}>{userName}</Text>
          <Text style={styles.date}>{new Date(timestamp?.toDate()).toUTCString()}</Text>
        </View>
      <Image style={styles.photo} source={{uri: imageUri}}/>
    </View>
    }
    {userLocation && 
    <View style={ sendFromId !== user.uid ? styles.wrapperLeft : styles.wrapperRight }>
      <View style={ sendFromId !== user.uid ? styles.messageContainerLeft : styles.messageContainerRight }>
        <Image style={styles.image} source={src}/>
        <View>
          <View style={ sendFromId !== user.uid ? styles.containerLeft : styles.containerRight }>
            <Text style={ sendFromId !== user.uid ? styles.messageLeft : styles.messageRight }>My current location is {userLocation}</Text>
          </View>
      </View>
      </View>
      <Text style={styles.date}>{new Date(timestamp?.toDate()).toUTCString()}</Text>
    </View>
  }

    </View>
  )
}

const styles = StyleSheet.create({
  wrapperLeft: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    
  },
  messageContainerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginVertical: 10
  },
  messageContainerRight: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-end',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth:2,
  },
  containerRight: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: color.lightGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerLeft: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: color.lightGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  date: {
    fontSize: Platform.OS === "android" ? 10 : 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
  },
  imageContainerLeft: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    margin: 10,
  },
  imageContainerRight: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    margin: 10,
  },
  photo: {
    width: 250,
    height: 250,
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  messageLeft: {
    fontSize: Platform.OS === "android" ? 12 : 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
    minWidth: "30%",
    maxWidth: "85%",
    textAlign: 'right'
  },
  messageRight: {
    fontSize: Platform.OS === "android" ? 12 : 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
    minWidth: "30%",
    maxWidth: "85%",
  },
})