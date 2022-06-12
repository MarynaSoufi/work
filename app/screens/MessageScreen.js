import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useAuth } from '../firebase/auth';
import color from '../config/colors';
import {
  Screen,
  Button,
  ListMessage,
  ListItemSeparator,
  ActivityIndicator,
} from '../components';
import { firestore, storage } from '../firebase/firebase';
import Modal from 'react-native-modal';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import uuid from 'react-native-uuid';
import { checkConnectivity } from '../utils/netInfo';
import cache from '../utils/cache';
import { getMediaFromGallery } from '../utils/getMediaFromGallery';
import { getMediaFromCamera } from '../utils/getMediaFromCamera';
import useAddress from '../hooks/useAddress';
import Dialog from 'react-native-dialog';
import { sendPushNotification } from '../utils/sendPushNotification';

export default function MessageScreen({ route, navigation }) {
  let chat;

  if (route.params.item) {
    chat = route.params.item;
  } else {
    chat = route.params;
  }

  const componentMounted = useRef(true);
  const { user } = useAuth();
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [visibleSheet, setVisibleSheet] = useState(false);
  const [text, onChangeText] = useState('');
  const [visibleLocation, setVisibleLocation] = useState(false);
  const [chatMesages, setChatMesages] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [chaTRecipient, setChaTRecipient] = useState([]);
  const location = useAddress();

  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
  const doc = firestore.doc(`users/${user.uid}`);
  const chatDoc = firestore.doc(`users/${chat?.user}`);

  const messagesId = [user.uid, chat?.user].sort().join('_');
  const senderDoc = firestore.doc(`chatMessages/${messagesId}`);
  const usersData = useFirestoreQuery(firestore.collection('users'));

  const chatInfo = useFirestoreQuery(
    firestore.collection('chatMessages').doc(messagesId)
  );

  const setData = () => {
    const users = usersData.data?.map((i) => ({ ...i }));
    if (users) {
      const userFound = users.find((i) => i.id === user.uid);
      setCurrentUser(userFound);
      setChaTRecipient(users.find((i) => i.id === chat?.user));
    }
    firestore
      .collection('chatMessages')
      .doc(messagesId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setChatMesages(snapshot.docs.map((doc) => doc.data()));
      });
  };

  useEffect(() => {
    if (componentMounted.current) {
      senderDoc.update({
        [`${user.uid}_inChat`]: true,
        [`${user.uid}_unread`]: 0,
      });
      setData();
    }
    return () => {
      senderDoc.update({
        [`${user.uid}_inChat`]: false,
      });
    };
  }, [messagesId, usersData.data]);

  const handlePress = async () => {
    let id = uuid.v4();
    if (chat.id) {
      if (text) {
        setLoading(true);
        const internetConnectionIsActive = await checkConnectivity();
        const messageRequest = {
          id: id,
          message: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          sendFromId: currentUser.id,
          sendFrom: currentUser.displayName,
          sendTo: chat?.displayName,
          senderPhoto: currentUser.image,
        };
        if (internetConnectionIsActive) {
          firestore
            .collection('chatMessages')
            .doc(messagesId)
            .collection('messages')
            .add(messageRequest);
        } else {
          cache.store(`${cache.privateKey}:${messagesId}`, messageRequest);
        }

        if (!chaTRecipient.myChats.includes(user.uid)) {
          await chatDoc.update({
            myChats: arrayUnion(user.uid),
          });
        } else if (!currentUser.myChats.includes(chat.user)) {
          await doc.update({
            myChats: arrayUnion(chat.user),
          });
        }

        if (!chatInfo?.data?.[`${chat?.user}_inChat`]) {
          senderDoc.update({
            [`${chat?.user}_unread`]:
              chatInfo?.data?.[`${chat?.user}_unread`] + 1,
          });
        }

        setLoading(false);
        sendPushNotification(
          chat.expoPushToken,
          user.displayName,
          text,
          currentUser
        );
      }

      onChangeText('');
    }
  };

  const selectImage = async () => {
    let id = uuid.v4();
    const path = `images/${user.uid}/${Date.now()}.jpg`;
    try {
      setLoading(true);
      const uri = await getMediaFromGallery();
      const response = await fetch(uri);
      const file = await response.blob();
      storage
        .ref(path)
        .put(file)
        .then(async (snapshot) => {
          const avatarUrl = await snapshot.ref.getDownloadURL();
          await firestore
            .collection('chatMessages')
            .doc(messagesId)
            .collection('messages')
            .add({
              id: id,
              imageUri: avatarUrl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              sendFromId: currentUser?.id,
              sendFrom: currentUser?.displayName,
              sendTo: chat?.displayName,
              senderPhoto: currentUser?.image,
            });
          if (!chaTRecipient.myChats.includes(user.uid)) {
            await chatDoc.update({
              myChats: arrayUnion(user.uid),
            });
          } else if (!currentUser.myChats.includes(chat.user)) {
            await doc.update({
              myChats: arrayUnion(chat.user),
            });
          }

          if (!chatInfo?.data?.[`${chat?.user}_inChat`]) {
            senderDoc.update({
              [`${chat?.user}_unread`]:
                chatInfo?.data?.[`${chat?.user}_unread`] + 1,
            });
          }
          setLoading(false);
          sendPushNotification(
            chat.expoPushToken,
            user.displayName,
            'send an image',
            currentUser
          );
        });
    } catch (error) {
      console.log('Error reading an image', error);
      setLoading(false);
    }
  };

  const showDialogLocation = () => {
    setVisibleLocation(true);
  };

  const handleCancelLocation = () => {
    setVisibleLocation(false);
  };

  const handleLocation = async () => {
    let id = uuid.v4();
    setLoading(true);
    if (location) {
      await firestore
        .collection('chatMessages')
        .doc(messagesId)
        .collection('messages')
        .add({
          id: id,
          userLocation: location,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userName: currentUser.displayName,
          sendFromId: currentUser.id,
          sendFrom: currentUser.displayName,
          sendTo: chat.displayName,
          senderPhoto: currentUser.image,
        });
      if (!chaTRecipient.myChats.includes(user.uid)) {
        await chatDoc.update({
          myChats: arrayUnion(user.uid),
        });
      }
      if (!currentUser.myChats.includes(chat.user)) {
        await doc.update({
          myChats: arrayUnion(chat.user),
        });
      }

      if (!chatInfo?.data?.[`${chat?.user}_inChat`]) {
        senderDoc.update({
          [`${chat?.user}_unread`]:
            chatInfo?.data?.[`${chat?.user}_unread`] + 1,
        });
      }
      setLoading(false);
    }
    sendPushNotification(
      chat.expoPushToken,
      user.displayName,
      location,
      currentUser
    );

    setVisibleLocation(false);
  };

  const openCamera = async () => {
    let id = uuid.v4();
    const path = `images/${user.uid}/${Date.now()}.jpg`;
    const uri = await getMediaFromCamera();
    if (uri) {
      setLoading(true);
      const response = await fetch(uri);
      const file = await response.blob();
      storage
        .ref(path)
        .put(file)
        .then(async (snapshot) => {
          const avatarUrl = await snapshot.ref.getDownloadURL();
          await firestore
            .collection('chatMessages')
            .doc(messagesId)
            .collection('messages')
            .add({
              id: id,
              imageUri: avatarUrl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              sendFromId: currentUser.id,
              sendFrom: currentUser.displayName,
              sendTo: chat.displayName,
              senderPhoto: currentUser.image,
            });
          if (!chaTRecipient.myChats.includes(user.uid)) {
            await chatDoc.update({
              myChats: arrayUnion(user.uid),
            });
          } else if (!currentUser.myChats.includes(chat.user)) {
            await doc.update({
              myChats: arrayUnion(chat.user),
            });
          }

          if (!chatInfo?.data?.[`${chat?.user}_inChat`]) {
            senderDoc.update({
              [`${chat?.user}_unread`]:
                chatInfo?.data?.[`${chat?.user}_unread`] + 1,
            });
          }
          setLoading(false);
          sendPushNotification(
            chat.expoPushToken,
            user.displayName,
            'send an image',
            currentUser
          );
        });
    }
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.container}>
          <View style={styles.room}>
            <Image style={styles.icon} source={{ uri: chat?.image }} />
            <Text style={styles.text}>{chat?.displayName}</Text>
          </View>
          <FlatList
            inverted={true}
            data={chatMesages}
            keyExtractor={(message) => message.id}
            renderItem={({ item }) => (
              <ListMessage
                message={item.message ? item.message : null}
                timestamp={item.timestamp}
                sendFromId={item.sendFromId}
                userName={item.sendFrom}
                src={{ uri: item.senderPhoto }}
                imageUri={item.imageUri ? item.imageUri : null}
                userLocation={item.userLocation ? item.userLocation : null}
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
          />
          <View style={styles.inputConteiner}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Your message..."
            />
            <Button
              styleBtn={styles.btn}
              iconName="paperclip"
              iconSize={24}
              onPress={() => setVisibleSheet(true)}
              iconColor={color.green}
            />
            <Button
              styleBtn={styles.btn}
              iconName="send"
              iconSize={24}
              onPress={handlePress}
              iconColor={color.green}
            />
          </View>
        </View>

        <View style={styles.modal}>
          <Button title="Show dialog" onPress={showDialogLocation} />
          <Dialog.Container visible={visibleLocation}>
            <Dialog.Title>Send Current Location</Dialog.Title>
            <Dialog.Description>
              Do you want to send your location? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancelLocation} />
            <Dialog.Button label="Send" onPress={handleLocation} />
          </Dialog.Container>
        </View>

        <Modal
          style={styles.bottomNavigationModal}
          animationType="slide"
          transparent={true}
          visible={visibleSheet}
          onBackdropPress={() => setVisibleSheet(!visibleSheet)}
          onSwipeComplete={() => setVisibleSheet(!visibleSheet)}
          onRequestClose={() => {
            setVisibleSheet(!visibleSheet);
          }}
        >
          <View style={styles.bottomNavigationView}>
            <Pressable>
              <Button
                onPress={selectImage}
                styleBtn={styles.camera}
                iconName="camera-image"
                iconSize={24}
                iconColor={color.green}
              />
            </Pressable>
            <Pressable>
              <Button
                onPress={showDialogLocation}
                styleBtn={styles.camera}
                iconName="map-marker"
                iconSize={24}
                iconColor={color.green}
              />
            </Pressable>

            <Pressable>
              <Button
                onPress={openCamera}
                styleBtn={styles.camera}
                iconName="camera-plus"
                iconSize={24}
                iconColor={color.green}
              />
            </Pressable>
          </View>
        </Modal>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputConteiner: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'relative',
    borderWidth: 2,
    borderColor: color.orange,
    borderRadius: 15,
    margin: 10,
  },
  bottomNavigationModal: {
    justifyContent: 'flex-end',
  },
  bottomNavigationView: {
    backgroundColor: color.white,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  input: {
    flexDirection: 'row',
    width: '80%',
    padding: 15,
    color: color.text,
  },
  btn: {
    paddingLeft: 5,
  },
  room: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: color.orange,
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    fontSize: Platform.OS === 'android' ? 18 : 20,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: 'bold',
    color: color.text,
    paddingHorizontal: 10,
  },
  camera: {
    width: '100%',
    paddingTop: 30,
    paddingLeft: 5,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});
