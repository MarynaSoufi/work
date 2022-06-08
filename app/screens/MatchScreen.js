import { StyleSheet, Text, View, Image, FlatList  } from 'react-native';
import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Screen } from '../components';
import { useAuth } from '../firebase/auth';
import ListItem from '../components/ListItem';
import color from '../config/colors';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { firestore } from '../firebase/firebase';
import firebase from 'firebase/compat/app';
import { getDistance } from '../utils/getRange';
import routes from '../navigation/routes';

export default function MatchScreen({ route, navigation }) {
  const dataItem = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ currentUser, setCurrentUser ] = useState([]);
  const [match, setMatch] = useState([]);
  const [ favoriteUsers, setFavoriteUsers ] = useState([]);

  const { data } = useFirestoreQuery(firestore.collection('settings'));
  const usersData = useFirestoreQuery(firestore.collection('users'));

  const setData = () => {
    setMatch(data?.map(i => {
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
      .filter(f => {    
        const result = f.user !== user.uid 
        && !f.isRequest 
        && f.pet === dataItem.pet 
        && new Date(f.fromDate) <= new Date(dataItem.fromDate) 
        && new Date(f.tillDate) >= new Date(dataItem.tillDate) 
        && (!f.myLocation 
          || !dataItem.myLocation 
          || getDistance(dataItem.myLocation.latitude, dataItem.myLocation.longitude, f.myLocation.latitude, f.myLocation.longitude) <= dataItem.range);
        return result;
      }))
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
      setFavoriteUsers(userFound?.favoriteUsers);
    }
  }
  useEffect(() => {
    setData();
  }, [data, usersData.data])

  const toggleFavorites = async (item) => { 
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    const doc = firestore.doc(`users/${user.uid}`);
    if (favoriteUsers) {
    if(favoriteUsers?.includes(item.user)){
      await doc.update({
        favoriteUsers: arrayRemove(item.user)
      });
      setFavoriteUsers(favoriteUsers.filter(fr => fr !== item.user));
    } else {
      await doc.update({
        favoriteUsers: arrayUnion(item.user)
      });
      if(!favoriteUsers.find(fr => fr.user === item.user)){
        setFavoriteUsers(favoriteUsers.concat(item.user));
      }
    }
  }
    }

  return (
    <> 
    <ActivityIndicator visible={loading}/>
     <Screen style={styles.container} >
     <View style={styles.matchListWrapper}>
       <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
       <View style={styles.headWrapper}>
        <View>
          <Text style={styles.welcome}>Hello {currentUser.displayName},</Text>
          <Text style={styles.match}>Explore your matches</Text>
        </View>
        <Image style={styles.icon}  source={{uri: currentUser.image}}/>
       </View>
       {match?.length > 0 &&      
       <View style={styles.matchListWrapper}>
        <FlatList 
            style={styles.matchList}
            nestedScrollEnabled={true}
            data={match}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
            <ListItem
              isFavorite={!!favoriteUsers?.find(fr => fr === item.user)}
              name={item.displayName}
              rating={item.rating}
              src={item.image}
              location={item.myCity}
              onMessage={() => navigation.navigate('Chat', {
                screen: routes.MESSAGE,
                params: {
                  item,
                },
              })}
              setFavorite={async () => await toggleFavorites(item)}
            />
              }
              />
       </View>}
       {match?.length < 1 &&
        <View style={styles.noMatches}>
           <Text style={styles.noMatchesText}>You don't have any matches, try to change your settings!</Text>
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
  noMatches: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: "50%"
  },
  noMatchesText: {
    color: color.orange,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 22 : 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }
})