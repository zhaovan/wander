import firebase from 'firebase';
require("firebase/firestore");

let config = {
    apiKey: "AIzaSyBMGik2kN4UMylunF2HpfwCZEF30L5_TRU",
    authDomain: "wander-7938d.firebaseapp.com",
    databaseURL: "https://wander-7938d.firebaseio.com",
    projectId: "wander-7938d",
    storageBucket: "wander-7938d.appspot.com",
    messagingSenderId: "559138438304",
    appId: "1:559138438304:web:80b0d03721ad8845"
};
let app = firebase.initializeApp(config);
export const db = firebase.firestore();