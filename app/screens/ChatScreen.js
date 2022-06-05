import { StyleSheet, Text, View,  Platform, TextInput, FlatList,  Pressable, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import firebase from 'firebase/compat/app';
import { useAuth } from '../firebase/auth';
import color from '../config/colors';
import { Screen, Button, Message, ListItemSeparator, ActivityIndicator , ListChats} from '../components';
import { firestore } from '../firebase/firebase';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import routes from '../navigation/routes';

const extra = "Hello World!"
export default function ChatScreen({ route, navigation }) {
  const chat = route.params;

  const {user} = useAuth();
  const [ currentUser, setCurrentUser ] = useState([]);
  const [myChats, setMyChats] = useState([]);
  const [chats, setChats] = useState([]);
  const componentMounted = useRef(true);

  const { data } = useFirestoreQuery(firestore.collection('users'));

  useEffect(() => {
    setData()
  }, [data])

  const setData = () => {
    const users = data;
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      if(userFound){
        setCurrentUser(userFound);
        setChats(users.filter(f=> userFound.myChats?.includes(f.user)))
      }      
    }
  }

  return (
    <Screen>
         <View style={styles.channelContainer}>
         <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
          <View style={styles.headWrapper}>
            <View>
              <Text style={styles.welcome}>Hello {currentUser.displayName},</Text>
              <Text style={styles.match}>Explore your chats</Text>
            </View>
            <Image style={styles.icon}  source={{uri: currentUser.image}}/>
          </View>
          <FlatList 
            style={styles.container}
            data={chats}
            nestedScrollEnabled={true}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
            <ListChats
              name={item.displayName}
              src={{uri: item.image}}
              extra={item.status? item.status : extra}
              onPress={() => navigation.navigate('Chat', {
                screen: routes.MESSAGE,
                params: {
                  item,
                },
              })}
              />
           }
            ItemSeparatorComponent={() =>
              <ListItemSeparator style={styles.line}/>
            }
          />
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  channelContainer:{
    flex:1,
  },
  welcome: {
    color: color.grayMiddle,
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start'
  },
  icon: {
    borderWidth:1,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  headWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  match: {
    color: color.text,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
 
})