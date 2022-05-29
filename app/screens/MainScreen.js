import { StyleSheet, Text, View, Image, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen, ReqResListItem } from '../components';
import color from '../config/colors';
import useLocation from '../hooks/useLocation';
import routes from '../navigation/routes';

const PROFILE_DATA = [
  {
    id: 1,
    firstNmae: "Marry",
    lastName: "Soufi",
    location: "Brussel",
    photoUrl: "https://avatars.githubusercontent.com/u/70641421?v=4",
    age: 31,
  },
  {
    id: 2,
    firstNmae: "Aiden",
    lastName: "Soufi",
    location: "Ghent",
    photoUrl: "https://avatars.githubusercontent.com/u/68068622?s=120&v=4",
    age: 34,
  },
  {
    id: 3,
    firstNmae: "Maryna",
    lastName: "Soufi",
    location: "Brugge",
    photoUrl: "https://www.zmoji.me/wp-content/uploads/2019/11/5-Incredible-Avatar-Maker-Free-Tools-You%E2%80%99ve-Missed-Before.jpg",
    age: 31,
  },
  {
    id: 4,
    firstNmae: "Maryna",
    lastName: "Soufi",
    location: "Brugge",
    photoUrl: "https://www.zmoji.me/wp-content/uploads/2019/11/5-Incredible-Avatar-Maker-Free-Tools-You%E2%80%99ve-Missed-Before.jpg",
    age: 31,
  },
  {
    id: 5,
    firstNmae: "Maryna",
    lastName: "Soufi",
    location: "Brugge",
    photoUrl: "https://www.zmoji.me/wp-content/uploads/2019/11/5-Incredible-Avatar-Maker-Free-Tools-You%E2%80%99ve-Missed-Before.jpg",
    age: 31,
  },
  {
    id: 6,
    firstNmae: "Maryna",
    lastName: "Soufi",
    location: "Brugge",
    photoUrl: "https://www.zmoji.me/wp-content/uploads/2019/11/5-Incredible-Avatar-Maker-Free-Tools-You%E2%80%99ve-Missed-Before.jpg",
    age: 31,
  }
]


const kindOfPet = [
{ label: "Dogs", value: "Dogs" },
{ label: "Cats", value: "Cats" },
{ label: "Rodents", value: "Rodents" },
{ label: "Birds", value: "Birds" },
{ label: "Fishes", value: "Fishes" },
{ label: "Reptiles", value: "Reptiles" },
];

export default function MainScreen({navigation}) {
  const { user } = useAuth();
  const [ firstVisit, setFirstVisit ] = useState(true);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const location = useLocation();
  const [req, setReq] = useState(true);
  const [active, setActive] = useState(1);
  const [offers, setOffers] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [ requests, setRequests ] = useState([]);

  const { data } = useFirestoreQuery(firestore.collection('settings'));

  const setData = () => {
    setRequests(data?.map(i => ({...i})).filter(f=> f.isRequest === true && f.user === user.uid))
    // firestore.collection('users')
    // .doc(user?.uid)
    // .onSnapshot(snapshot => setMyOffers(snapshot.data()))
  
  }

  useEffect(() => {
    setData();
  }, [data])

const handleMatch = (item) => {
  console.log(item.id);
  navigation.navigate(routes.MATCH, item)
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
       {requests?.length < 1 && 
        <View>
          <Text>You have not any requests yet</Text>
        </View>}
        {requests?.length > 0 && 
       <View style={styles.requestsWrapper}>
          <FlatList 
              style={styles.matchList}
              nestedScrollEnabled={true}
              data={requests}
              keyExtractor={d => d.id.toString()}
              renderItem={({item}) =>
              <ReqResListItem
                from={item.fromDate}
                till={item.tillDate}
                pet={item.pet}
                range={item.range}
                match={true}
                onMatchPress={()=> handleMatch(item)}
              />
                }
                />
        </View>
}
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
  scroll: {
   marginTop: 20
  },
  centeredView: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: color.green,
    width: "100%",
    borderRadius:15,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start'
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: color.lightGray,
  },
  switcher: {
    alignSelf: 'flex-end',
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
  icon: {
    borderWidth:1,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  headWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  petSwitcher: {
    width: "100%"
  },
  petSwitcherWrap: {
    width: "100%",
    marginVertical: 20,
  },
  matchListWrapper: {
    flex: 1
  },
  requestsWrapper: {
    marginBottom: 100,
    paddingBottom: 100,
    marginTop: 20,
    paddingTop: 20,
  }
})