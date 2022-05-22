
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen } from '../components';
import { AppForm, SelectFromField, SubmitButton, CalendarSeelectField, ErrorMessage, MultiSliderField } from '../components/forms';
import * as Yup from 'yup';
import color from '../config/colors';
import useLocation from '../hooks/useLocation';

const validationSchema = Yup.object().shape({
  myPet: Yup.string().required().label("My Pet"),
  guestPet: Yup.string().required().label("Guest Pet"),
  range: Yup.number().required().label("Range"),
  guestDates: Yup.object().shape({
    from: Yup.date().required('Mandatory field message').label("From"),
    till: Yup.string().required('Mandatory field message').label("Till"),
  }),
  myDates: Yup.object().shape({
    from: Yup.date().required('Mandatory field message').label("From"),
    till: Yup.string().required('Mandatory field message').label("Till"),
  }),
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

  const { data } = useFirestoreQuery(firestore.collection('users').doc(user.uid));

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
        myPet: info.myPet,
        myFromDate: info.myDates.from.toISOString(),
        myTillDate: info.myDates.till.toISOString(),
        guestPet: info.guestPet,
        guestFromDate: info.guestDates.from.toISOString(),
        guestTillDate: info.guestDates.till.toISOString(),
        myLocation: location,
        range: +info.range
      };
      console.log(request);
      let doc = firestore.collection('settings').doc(user.uid);
      await doc.set(request);

      await firestore.collection('users').doc(user.uid).update({
        firstVisit: false,
      })
    }
    catch(error){
      setFailed(true);
      setLoading(false);
    }
  }

  const setData = () => {
    setFirstVisit(data?.firstVisit)
  }

  useEffect(() => {
    setData();
  }, [data])

  return (
    <>
    <ActivityIndicator visible={loading}/>
     <Screen Screen style={styles.container} >
     <Image style={styles.logo} source={require('../assets/iconPetlyS.png')}/>
     <ScrollView>
     {firstVisit && 
      <AppForm
      initialValues={{myPet: "",  myDates:{from: "", till: "" }, guestPet: "", guestDates:{from: "", till: "" }, range: 5}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <ErrorMessage error="You need to fill all fields" visible={failed} />
      <SelectFromField name="myPet" arr={kindOfPet} text="Choose your pet to look after"/>
      <CalendarSeelectField name="myDates" tillName="myDates.till" fromName="myDates.from" text="Pick dates when your pet needs to be looked after"/>
      <SelectFromField name="guestPet" arr={kindOfPet} text="Choose the pet for wich you are ready to look after"/> 
      <CalendarSeelectField name="guestDates" tillName="guestDates.till" fromName="guestDates.from" text="Pick dates when your are ready to look after the guest pet"/>
      <MultiSliderField text="Pick dates when your are ready to look after the guest pe" name="range"/>
         <SubmitButton title="SUBMIT"/>
        </AppForm>
     }
     {!firstVisit && <View><Text>ggg</Text></View>

     }
    </ScrollView>
    </Screen >
    </>
 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
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
    alignSelf: 'center'
  }
})