import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const app = firebase.initializeApp({
    // deploy
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""

});

export const firestore = firebase.firestore()
export const auth = firebase.auth()
