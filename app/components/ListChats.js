import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import defaultStyles from '../config/styles';
import color from '../config/colors';
import { firestore } from '../firebase/firebase';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';

export default function ListChats({name, onPress, src, extra, renderRightActions, userId}) {
  const { data: userData } = useFirestoreQuery(firestore.collection('users').doc(userId)); 
 
  
  return (
    <Swipeable renderRightActions={renderRightActions}>
      { userId &&  
        <TouchableHighlight onPress={onPress} underlayColor='#f5f5f5'>
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: userData?.image}}/>
            <View>
              <Text style={styles.name}>{userData?.displayName}</Text>
              <Text style={ userData?.status === 'online'? styles.extraOnline : styles.extraOffline}>{userData?.status}</Text>
            </View>
          </View>
        </TouchableHighlight>}
        { !userId &&
          <TouchableHighlight onPress={onPress} underlayColor='#f5f5f5'>
            <View style={styles.container}>
              <Image style={styles.image} source={src}/>
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={ extra === 'online'? styles.extraOnline : styles.extraOffline}>{extra}</Text>
              </View>
            </View>
          </TouchableHighlight>
        }
       
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    padding: 10,
  },
  name: 
   defaultStyles.text
  ,
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth:2,
    marginRight: 8
  },
  extraOnline: {
    color: color.green
  },
  extraOffline: {
    color: color.orange,
  },

})
