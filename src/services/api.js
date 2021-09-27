import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

import { firebaseConfig } from "./FirebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export const loginWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);

    return result;
}

export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebaseApp.auth().signInWithPopup(provider);

  return result;
}

export const addUser = async (user) => {
  await db.collection("users").doc(user.id).set({
    name: user.name,
    avatar: user.avatar
  }, {merge: true});
}

export const getContactList = async (userId) => {
  let list = [];

  let results = await db.collection("users").get();
  results.forEach(res => {
    let data = res.data();

    if(res.id !== userId) {
      list.push({
        id: res.id,
        name: data.name,
        avatar: data.avatar
      });
    }
  })
  return list;
}

export const addNewChat = async (user, user2) => {
  let newChat = await db.collection("chats").add({
    messages: [],
    users: [user.id, user2.id]
  });

  db.collection("users").doc(user.id).update({
    chats: firebase.firestore.FieldValue.arrayUnion({
      chatId: newChat.id, 
      title: user2.name,
      image: user2.avatar,
      with: user2.id
    })
  });

  db.collection("users").doc(user2.id).update({
    chats: firebase.firestore.FieldValue.arrayUnion({
      chatId: newChat.id, 
      title: user.name,
      image: user.avatar,
      with: user.id
    })
  });
}

export const chatList = (userId, setChatList) => {
  return db.collection("users")
    .doc(userId)
    .onSnapshot(doc => {
      if(doc.exists){
        let data = doc.data();
        if(data.chats){
          setChatList(data.chats);
        }
      }
    });
}