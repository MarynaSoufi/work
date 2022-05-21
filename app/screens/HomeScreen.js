
import { StyleSheet, Text, View,  KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import Modal from "react-native-modal";
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { ActivityIndicator, Screen, Button } from '../components';
import { AppForm, AppFormField, SelectFromField, SubmitButton, DateSelectField, CalendarSeelectField, CustomSelect, ErrorMessage } from '../components/forms';
import * as Yup from 'yup';
import color from '../config/colors';
import useLocation from '../hooks/useLocation';

const validationSchema = Yup.object().shape({
  myPet: Yup.string().required().label("MyPet"),
  // myDates: Yup.object().shape({
  //   from: Yup.date().required().label("from"),
  //   till: Yup.date().required().label("till"),
  // })
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
  const [loginFailed, setLoginFailed] = useState(false);
  const [ visibleSheet, setVisibleSheet ] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);
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
      const dist = getDistance(41.756, 51.223)
      console.log('INFO=.>>',info);
      console.log('myPet',info.myPet);
      console.log('myDates.from',info.myDates.from);
      console.log('myDates.till',info.myDates.till);
      const request = {
        myPet: info.myPet,
        myFromDate: info.myDates.from.toString(),
        myTillDate: info.myDates.till.toString(),
        guestPet: info.guestPet,
        guestFromDate: info.guestDates.from.toISOString(),
        guestTillDate: info.guestDates.till.toISOString(),
        myLocation: location,
      };
      console.log(request);
      console.log(user.uid);
      let doc = firestore.collection('settings').doc(user.uid);
      //console.log(JSON.stringify(doc));
      await doc.set(request);

      // await firestore.collection('users').doc(user.uid).update({
      //   firstVisit: false,
      // })
    }
    catch(error){
      console.log('ntok')
    }
  }

  const setData = () => {
    setFirstVisit(data?.firstVisit)
  }

  useEffect(() => {
    setData();
    // firestore.collection('users').doc(user.uid).update({
    //   firstVisit: false})
  }, [data])

  return (
    <>
    <ActivityIndicator visible={loading}/>
     <Screen style={styles.container} >
     {firstVisit && 
      <AppForm
      initialValues={{myPet: "",  myDates:{from: "", till: "" }, guestPet: "", guestDates:{from: "", till: "" }}}
      // initialValues={{myPet: ""}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <ErrorMessage error="Invalid email and/or password" visible={loginFailed} />
      <SelectFromField name="myPet" arr={kindOfPet} text="Choose the animal"/>
      <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <CalendarSeelectField tillName="myDates.till" fromName="myDates.from"/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
          </View> 
          <SelectFromField name="guestPet" arr={kindOfPet} text="Choose the animal"/> 
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalGuestVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <CalendarSeelectField tillName="guestDates.till" fromName="guestDates.from"/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalGuestVisible(!modalGuestVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalGuestVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
          </View> 
         <SubmitButton title="SUBMIT"/>
        </AppForm>
     }
     {!firstVisit && <View><Text>ggg</Text></View>

     }
    </Screen>
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
    marginTop: 22
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
    backgroundColor: "#F194FF",
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
  }
})