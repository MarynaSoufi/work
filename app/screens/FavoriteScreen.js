import { StyleSheet, Text, View,  FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import ListItem from '../components/ListItem';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { Screen } from '../components';
import color from '../config/colors';
import firebase from 'firebase/compat/app';
import routes from '../navigation/routes';


export default function FavoriteScreen({ route, navigation }) {
  const { user } = useAuth();
  const [ favoriteUsers, setFavoriteUsers ] = useState([]);
  const [ favoriteUsersData, setFavoriteUsersData ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState([]);

  const { data } = useFirestoreQuery(firestore.collection('users').doc(user.uid));

  const usersData = useFirestoreQuery(firestore.collection('users'));

  const favoriteData = useFirestoreQuery(firestore.collection('settings'));

  const setData = () => {
    setFavoriteUsers(data?.favoriteUsers);
    setFavoriteUsersData(favoriteData.data?.map(i => {
      const setting = {...i};
      if(usersData?.data){
        const foundUser = usersData.data.find(u => u.id === i.user);
        if(foundUser){
          setting.rating = foundUser.rating.reduce((a, b) => a + b, 0) / foundUser.rating.length;
        } else {
          setting.rating = 3;
        }
      }
      return setting;
    })
    .filter(f => favoriteUsers.includes(f.id)))
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
      setFavoriteUsers(userFound?.favoriteUsers);
    }
  }

  useEffect(() => {
    setData();
  }, [data, usersData.data, favoriteData.data])
 
  const toggleFavorites = async (item) => { 
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    const doc = firestore.doc(`users/${user.uid}`);
    if (favoriteUsers) {
    
    if(favoriteUsers?.includes(item.id)){
      await doc.update({
        favoriteUsers: arrayRemove(item.id)
      });
      setFavoriteUsers(favoriteUsers.filter(fr => fr !== item.id));
    } else {
      await doc.update({
        favoriteUsers: arrayUnion(item.id)
      });
      if(!favoriteUsers.find(fr => fr.id === item.id)){
        setFavoriteUsers(favoriteUsers.concat(item.id));
      }
    }
  }
  }

  return (
    <> 
     <Screen style={styles.container} >
     <View style={styles.matchListWrapper}>
       <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
       <View style={styles.headWrapper}>
        <View>
          <Text style={styles.welcome}>Hello {currentUser.displayName},</Text>
          <Text style={styles.match}>Explore your favorites</Text>
        </View>
        <Image style={styles.icon}  source={{uri: currentUser.image}}/>
       </View>
       {favoriteUsers?.length > 0 &&      
       <View style={styles.matchListWrapper}>
        <FlatList 
            style={styles.matchList}
            nestedScrollEnabled={true}
            data={favoriteUsersData}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
            <ListItem
              isFavorite={!!favoriteUsers?.find(fr => fr === item.id)}
              name={item.displayName}
              rating={item.rating}
              src={item.image}
              location={item.myCity}
              setFavorite={async () => await toggleFavorites(item)}
              onMessage={() => navigation.navigate('Chat', {
                screen: routes.MESSAGE,
                params: {
                  item,
                },
              })}
            />
              }
              />
       </View>}
       {favoriteUsersData?.length < 1 &&
        <View style={styles.noFavorites}>
        <Text style={styles.noFavoritesText}>You don't have any favories!</Text>
       </View>}
  
     </View>  
   
    </Screen >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  matchListWrapper: {
    flex: 1
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
  welcome: {
    color: color.grayMiddle,
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  match: {
    color: color.text,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  noFavorites: {
    flex: 1,
    alignSelf: 'center',
  },
  noFavoritesText: {
    color: color.orange,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 22 : 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }
})


