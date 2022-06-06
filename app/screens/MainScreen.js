import { StyleSheet, Text, View, Image, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen, ReqResListItem } from '../components';
import color from '../config/colors';
import routes from '../navigation/routes';
import useNotifications from '../hooks/useNotifications';


export default function MainScreen({navigation}) {
  const { user } = useAuth();
  const [ currentUser, setCurrentUser ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ requests, setRequests ] = useState([]);
  useNotifications();

  const { data } = useFirestoreQuery(firestore.collection('settings'));

  const usersData = useFirestoreQuery(firestore.collection('users'))

  const setData = () => {
    setRequests(data?.map(i => ({...i})).filter(f=> f.isRequest === true && f.user === user.uid));
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
    }
    
  }

  useEffect(() => {
    setData();
  }, [data, usersData.data])

const handleMatch = (item) => {
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
          <Text style={styles.welcome}>Hello { currentUser?.displayName},</Text>
          <Text style={styles.match}>Explore your requests</Text>
        </View>
        <Image style={styles.icon}  source={{uri:  currentUser?.image}}/>
       </View>
       {requests?.length < 1 && 
        <View style={styles.noRequests}>
          <Text style={styles.noRequestsText}>You have not any requests yet</Text>
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
    paddingTop: 20,
  },
  noRequests: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: "50%"
  },
  noRequestsText: {
    color: color.orange,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 22 : 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }
})