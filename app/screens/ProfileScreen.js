import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../firebase/auth';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { firestore, storage  } from '../firebase/firebase';
import { ActivityIndicator, AppFromImagePicker, Screen } from '../components';
import color from '../config/colors';


const validationSchema = Yup.object().shape({
  username: Yup.string().label("UserName"),
  email: Yup.string().email().label("Email"),
  password: Yup.string().min(4).label("Password"),
  firstName: Yup.string().min(2).label("FirstName"),
  lastName:Yup.string().min(2).label("LastName"),
  age: Yup.number().label("Age"),
  avatarImage: Yup.object().nullable().label("Image"),
})

export default function ProfileScreen() {
  const {user} = useAuth();
  const [ currentUser, setCurrentUser ] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersData = useFirestoreQuery(firestore.collection('users'))

  useEffect(() => {
    const users = usersData.data?.map(i => ({...i}));
    if(users){
      const userFound = users.find(i => i.id === user.uid);
      setCurrentUser(userFound);
    }
  }, [usersData.data])

  const handleSubmit = async(info) => {
    setLoading(true);
    console.log('Submit')
    const path = `avarats/${user.uid}/avatar.jpg`;

    const response =  await fetch(info.avatarImage);
      const file =  await response.blob();
      storage.ref(path).put(file).then(
        async (snapshot) => {
          const avatarUrl = await snapshot.ref.getDownloadURL();
          firestore.collection('users').doc(user.uid).update({
            image: avatarUrl
          })
          user.updateProfile({
            photoURL: avatarUrl,
          });
        }
      );

      await firestore.collection('users').doc(user.uid).update({
        displayName: info.userName !== "" ? info.userName : currentUser.displayName,
        email: info.email !== "" ? info.email : currentUser.email,
        firstName: info.firstName !== "" ? info.firstName : currentUser.firstName,
        lastName: info.lastName !== "" ? info.lastName : currentUser.lastName,
        age: info.age !== "" ? info.age : currentUser.age,
      })
      setLoading(false);
  }
  
  return (
    <>
    <ActivityIndicator visible={loading}/>
    <Screen>
      <ScrollView style={styles.container}>
        {/* <UploadScreen progress={progress} visible={uploadVisible} onDone={() => setUploadVisible(false)}/> */}
       <Text style={styles.text}>Update profile</Text> 
      <AppForm
        initialValues={{userName: currentUser.displayName? currentUser.displayName: "", email: currentUser.email ? currentUser.email : "", password: currentUser.password ? currentUser.pasword : "", firstName: currentUser.firstName ? currentUser.firstName : "", lastName: currentUser.lastName ? currentUser.lastName : "", age: currentUser.age ? currentUser.age : "", avatarImage: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
              <AppFromImagePicker name="avatarImage" userImage={currentUser.image}/>
              <AppFormField
                text='User Name'
                maxLength={255}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={currentUser.displayName ? currentUser.displayName : 'UserName'}
                name="userName"
              />
              <AppFormField
                  text='Email'
                  icon="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder={currentUser.email ? currentUser.email : 'Email'}
                  name="email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  text='Password'
                  icon="lock"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Password"
                  name="password"
                  textContentType="password"
                  secureTextEntry
                />
              <AppFormField
                text='FirstName'
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={8}
                placeholder={currentUser.firstName ? currentUser.firstName : 'FirstName'}
                name="firstName"
              />
                <AppFormField
                text='LastName'
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={255}
                placeholder={currentUser.lastName ? currentUser.lastName : 'LastName'}
                name="lastName"
              />
                <AppFormField
                text='Age'
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={3}
                keyboardType="numeric"
                placeholder={currentUser.age ? currentUser.age : 'Age'}
                name="age"
              />
              <SubmitButton title="UPDATE"/>
      </AppForm>
      </ScrollView>
    </Screen>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  text: {
    color: color.green,
    alignSelf: 'flex-end',
    marginBottom: 20
  }
})