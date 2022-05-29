import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import secrets from '../config/secret';
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGEBUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env';

const app = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
})

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();

export default app;