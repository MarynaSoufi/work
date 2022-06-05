import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore, storage } from './firebase';
import useCity from '../hooks/useCity';


//create a context
const authContext = createContext();

//publsh th e context re-render when needed
export const useAuth = () => {
  return useContext(authContext);
}

export function AuthProvider ({ children }) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const city = useCity();

  //login
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
    
  const register = async (name, email, password) => {
    const avatarUrl = await storage.ref('avatar.png').getDownloadURL(); 
    const response = await auth
      .createUserWithEmailAndPassword(email, password);
       await firestore.collection('users').doc(response.user.uid).set({
        id: response.user.uid,
        displayName: name,
        email: email,
        image: avatarUrl,
        status: 'online',
        age: '',
        firstName: '',
        lastName: '',
        firstVisit: true,
        city: city,
        rating: [],
        favoriteUsers:[],
        myChats: [],
        user: response.user.uid
      })
    return await response.user.updateProfile({
      displayName: name,
      photoURL: avatarUrl
    });
   }

   //logout

   const logout = () => auth.signOut();

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
        firestore.collection('users').doc(user.uid).update({
          status: 'online'
        })
      }
      else{
      setUser(false);
      setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
   }, []);

   const value = {
     user,
     login,
     register,
     logout,
   }
   return (
     <authContext.Provider value={value}>
      
      {!loading && children}
     </authContext.Provider>
   )
   
}
