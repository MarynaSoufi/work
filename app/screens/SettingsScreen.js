import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import colors from '../config/colors';
import { AccountCard, Screen, Button } from '../components';
import color from '../config/colors';
import routes from '../navigation/routes';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { useState } from 'react';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';

const data = [
  {
    id: 1,
    title: "My Profile",
    icon: {
      name: 'account-edit',
      color: color.orange
    },
    targetScreen: routes.PROFILE
   
  },
  {
    id: 2,
    title: "My Requests",
    icon: {
      name: 'transfer-right',
      color: color.orange
    },
    targetScreen: routes.REQUESTS
  },
  {
    id: 3,
    title: "My Offers",
    icon: {
      name: 'transfer-left',
      color: color.orange
    },
    targetScreen: routes.OFFERS
  }
  
]

export default function SettingsScreen({ navigation }) {
  const {user, logout, deleteAccount} = useAuth();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [ currentUser, setCurrentUser ] = useState([]);
  const [userAction, setUserAction] = useState([]);
  const { deleteDoc } = useFirestoreCrud(firestore.collection('settings'));

  const usersData = useFirestoreQuery(firestore.collection('users'))

  const settingsData  = useFirestoreQuery(firestore.collection('settings'));

  const setData = () => {
    setUserAction(settingsData.data?.map(i => ({...i})).filter(f=> f.user === user.uid))
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
    }
    
  }
  useEffect(() => {
    setData();
  }, [usersData.data, settingsData.data])

  const handleDelete = async() => { 
    if(userAction.length > 0) {
      userAction.forEach((a) => {
        deleteDoc(a.id);
      })
    }
    await firestore.collection('users').doc(user.uid).delete();
    deleteAccount()  
    setVisibleDelete(false);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  }

  const showDialogDelete = () => {
    setVisibleDelete(true);
  };

  
  const handleCancelDelete = () => {
    setVisibleDelete(false);
  }

  return (
    <Screen>
      <View style={styles.container}>
       <View style={styles.nameWrapper}>
        <Image style={styles.icon} source={{uri: currentUser?.image}}/>
        <Text style={styles.name}>{user.displayName}</Text>
       </View>
       <FlatList 
        data={data}
        keyExtractor={(item) => item.title}
        renderItem ={({ item }) => <AccountCard title={item.title} onPress={() => navigation.navigate(item.targetScreen, item) }
        IconComponent={<MaterialCommunityIcons name={item.icon.name} size={32} color={item.icon.color}/>}
        /> }
        />
        <View style={styles.btnWrapper}>
          <MaterialCommunityIcons onPress={() =>{firestore.collection('users').doc(user.uid).update({
            status: 'offline'
          }), logout()}} name="login" size={28} color={colors.green} />
          <Text style={styles.text}>Sign Out</Text>
        </View>
        <View style={styles.btnWrapper}>
        <Ionicons onPress={showDialogDelete} name="warning" size={24} color={colors.green} />
          <Text style={styles.text}>Delete Account</Text>
        </View>
    </View>
    <View style={styles.modal}>
          <Button title="Show dialog" onPress={showDialogDelete} />
          <Dialog.Container visible={visibleDelete}>
            <Dialog.Title>Delete account</Dialog.Title>
            <Dialog.Description>
              Do you want to delete your account? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancelDelete} />
            <Dialog.Button label="Delete" onPress={handleDelete} />
          </Dialog.Container>
        </View>
    </Screen>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nameWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  icon: {
    borderWidth:1,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  name: {
    color: color.text,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: 140,
    marginHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: color.lightGray,
    backgroundColor: color.lightGray,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10
  },
  text: {
    color: color.text,
    paddingHorizontal: 10,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "700"
  }
})