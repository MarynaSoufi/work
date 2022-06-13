import { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';


export default useNotifications = (notificationListener) => {
  const {user} = useAuth();
  const [expoPushToken, setExpoPushToken] = useState('');
  useEffect (() => {
    registerForPushNotifications().then(token => setExpoPushToken(token));
    if(notificationListener) Notifications.addNotificationResponseReceivedListener(notificationListener);
  },[])
   const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      if(!permission.granted) return;
      token = (await Notifications.getExpoPushTokenAsync()).data;
      firestore.collection('users').doc(user?.uid).update({
        expoPushToken: token
      })
      return token
      
    }
    catch(error) {
      console.log(error);
    }
  }
 
}