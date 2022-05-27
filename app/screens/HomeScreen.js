
import { StyleSheet, Text, View, Image, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen, SwitcherItem } from '../components';
import ListItem from '../components/ListItem';
import { AppForm, SelectFromField, SubmitButton, CalendarSeelectField, ErrorMessage, MultiSliderField } from '../components/forms';
import * as Yup from 'yup';
import color from '../config/colors';
import useLocation from '../hooks/useLocation';

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

const SWITCER_DATA = [
  {
    id: 1,
    title: "Request",
    isRequest: true
  },
  {
    id: 2,
    title: "Offer",
    isRequest: false
  },

]

const SWITCER_PETS = [
  {
    id: 1,
    title: "Dogs",
  },
  {
    id: 2,
    title: "Cats",
  },
  {
    id: 3,
    title: "Rodents",
  },
  {
    id: 4,
    title: "Birds",
  },
  {
    id: 5,
    title: "Fishes",
  },
  {
    id: 6,
    title: "Reptiles",
  },

]
const validationSchema = Yup.object().shape({
  pet: Yup.string().required().label("Pet"),
  range: Yup.number().label("Range"),
  // dates: Yup.object().shape({
  //   from: Yup.date().required('Mandatory field message').label("From"),
  //   till: Yup.string().required('Mandatory field message').label("Till"),
  // }),
})

const kindOfPet = [
{ label: "Dog", value: "Dog" },
{ label: "Cat", value: "Cat" },
{ label: "Rodent", value: "Rodent" },
{ label: "Bird", value: "Bird" },
{ label: "Fish", value: "Fish" },
{ label: "Reptiles", value: "Reptiles" },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [ firstVisit, setFirstVisit ] = useState(true);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const location = useLocation();
  const [req, setReq] = useState(true);
  const [active, setActive] = useState(1);
  const scrollViewRef = useRef();

  const { data } = useFirestoreQuery(firestore.collection('users').doc(user.uid));

  useEffect(() => {
    setData();
  }, [data])

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d / 1000;
  }
  const handleSubmit = async(info) => {
    try {
      setLoading(true);
      const request = {
        user: user.uid,
        pet: info.pet,
        fromDate: info.dates.from.toISOString(),
        tillDate: info.dates.till.toISOString(),
        myLocation: location,
        range: +info.range,
        isRequest: req
      };
      let doc = firestore.collection('settings');
      await doc.add(request);

      await firestore.collection('users').doc(user.uid).update({
        firstVisit: false,
      })
      setLoading(false);
    }
    catch(error){
      setFailed(true);
      setLoading(false);
    }
  }

  const setData = () => {
    setFirstVisit(data?.firstVisit)
  }

const toggleActive = async (item) => {
  setReq(item.isRequest);
  setActive(item.id);
}
  return (
    <> 
    <ActivityIndicator visible={false}/>
     <Screen style={styles.container} >
     {firstVisit && req &&
     <> 
     <View style={styles.scroll}>
     <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
        <FlatList 
          horizontal
          style={styles.switcher}
          data={SWITCER_DATA}
          keyExtractor={d => d.id.toString()}
          renderItem={({item}) =>
            <SwitcherItem
              isActive={active}
              id={item.id}
              title={item.title}
              onPress={()=>toggleActive(item)}
              />
          }
          /> 
     </View>
      <ScrollView scrollbars="none">
      <AppForm
      initialValues={{pet: "",  dates:{from: "", till: "" }, range: 5}}
      onSubmit={handleSubmit}
     >
      <ErrorMessage error="You need to fill all fields" visible={failed} />
      <SelectFromField name="pet" arr={kindOfPet} text="Choose your pet to look after"/>
      <CalendarSeelectField name="dates" tillName="dates.till" fromName="dates.from" text="Pick dates when your pet needs to be looked after"/>
      <MultiSliderField text="Pick dates when your are ready to look after the guest pe" name="range"/>
      <SubmitButton title="CONFIRM"/>
      </AppForm>
    </ScrollView>   
    </>
     }
      {firstVisit && !req &&
      <>
       <View style={styles.scroll}>
       <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
          <FlatList 
            horizontal
            style={styles.switcher}
            data={SWITCER_DATA}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
              <SwitcherItem
                isActive={active}
                id={item.id}
                title={item.title}
                onPress={()=>toggleActive(item)}
                />
            }
            /> 
       </View>
      <ScrollView>
      <AppForm
      initialValues={{pet: "",  dates:{from: "", till: "" }}}
      onSubmit={handleSubmit}
     >
      <ErrorMessage error="You need to fill all fields" visible={failed} />
      <SelectFromField name="pets" arr={kindOfPet} text="Choose the pet for wich you are ready to look after"/> 
      <CalendarSeelectField name="dates" tillName="dates.till" fromName="dates.from" text="Pick dates when your are ready to look after the guest pet"/>
      <SubmitButton title="CONFIRM"/>
      </AppForm>
    </ScrollView>   
    </>
     }
     {!firstVisit && 
     <View style={styles.matchListWrapper}>
       <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
       <View style={styles.headWrapper}>
        <View>
          <Text style={styles.welcome}>Hello {user.displayName},</Text>
          <Text style={styles.match}>Pets waiting for you</Text>
        </View>
        <Image style={styles.icon}  source={{uri: user.photoURL}}/>
       </View>
       <View style={styles.petSwitcherWrap}>
        <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.petSwitcher}
            data={SWITCER_PETS}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
              <SwitcherItem
                isActive={active}
                id={item.id}
                title={item.title}
                onPress={()=>toggleActive(item)}
                />
            }
            /> 
       </View>
       <View style={styles.matchListWrapper}>
        <FlatList 
            style={styles.matchList}
            nestedScrollEnabled={true}
            data={PROFILE_DATA}
            keyExtractor={d => d.id.toString()}
            renderItem={({item}) =>
            <ListItem
              name={item.firstNmae}
              src={item.photoUrl}
              location={item.location}
              onPress={()=>console.log("Press")}
            />
              }
              />
       </View>
      </View>
     }
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
    borderColor: color.green,
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
  }
})