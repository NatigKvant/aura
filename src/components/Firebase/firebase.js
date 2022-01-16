import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAd5KEZjxa8u7ue55vL7Cox-WVYJhWtULI",
    authDomain: "aura-40bf9.firebaseapp.com",
    projectId: "aura-40bf9",
    storageBucket: "aura-40bf9.appspot.com",
    messagingSenderId: "9399643092",
    appId: "1:9399643092:web:10642d1deb82e501804441"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}