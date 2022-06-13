import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const privateKey = 'private';
const roomKey = 'rooms';
const expiryMinutes = 5;
const store = async (key, value) => {
  try {
    const item = {
    value,
    timestamp: Date.now()}
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
  
}

const isExpires = (item) => {
  const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, 'minutes') > expiryMinutes;
}

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);
    if(!item) return null;
    if(isExpires(item)) {
      await AsyncStorage.removeItem(key)
      return null;
    };
    return item.value;
  } 
  catch(error) {
    console.log(error);
  }
}

const remove = async (key) => {
  await AsyncStorage.removeItem(key);
}

const keys = async () => {
  return await AsyncStorage.getAllKeys();
}

export default{
  store, 
  get,
  remove,
  keys,
  privateKey,
  roomKey
}