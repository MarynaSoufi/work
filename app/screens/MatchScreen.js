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

export default function MatchScreen({ route, navigation }) {
  const dataItem = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ currentUser, setCurrentUser ] = useState([]);
  const [match, setMatch] = useState([]);
  const [ favoriteUsers, setFavoriteUsers ] = useState([]);
  console.log('params', dataItem);

  const { data } = useFirestoreQuery(firestore.collection('settings'));
  const usersData = useFirestoreQuery(firestore.collection('users'));

  const setData = () => {
    setMatch(data?.map(i => ({...i})).filter(f=> f.user !== user.uid && f.isRequest === false && f.pet === dataItem.pet && f.fromDate <= dataItem.fromDate && f.tillDate >= dataItem.tillDate))
    // const d = getDistance(51.209348, 3.224700, 51.0376144, 3.7978799 );
    // console.log('dist', d)
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
      setFavoriteUsers(userFound?.favoriteUsers);
    }
  }
console.log('fav', favoriteUsers);
  useEffect(() => {
    setData();
  }, [data])

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
    <ActivityIndicator visible={false}/>
     <Screen style={styles.container} >
     <View style={styles.matchListWrapper}>
       <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
       <View style={styles.headWrapper}>
        <View>
          <Text style={styles.welcome}>Hello {user.displayName},</Text>
          <Text style={styles.match}>Pets waiting for you</Text>
        </View>
        <Image style={styles.icon}  source={{uri: user.photoURL}}/>
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
            isFavorite={!!favoriteUsers?.find(fr => fr === item.id)}
              name={item.name}
              src={item.photo}
              location={item.myCity}
              setFavorite={async () => await toggleFavorites(item)}
            />
              }
              />
       </View>}
       {match?.length < 1 &&
        <View>
        <Text>You don't have any matches, try to change your settings!</Text>
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
})