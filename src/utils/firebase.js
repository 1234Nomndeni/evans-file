import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
// import { getAnalytics } from "firebase/analytics";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5ZbRMnRdqubGNSc2KzEVDg2fKizxbniU",
    authDomain: "blog-594a2.firebaseapp.com",
    projectId: "blog-594a2",
    storageBucket: "blog-594a2.appspot.com",
    messagingSenderId: "554911575314",
    appId: "1:554911575314:web:5462233055b1566e4e57cb",
    measurementId: "G-F92XYFF2VB"
});

// const app = firebaseApp()
// const analytics = getAnalytics(app);
const db = firebaseApp.firestore()
const auth = firebase.auth();
const storage = firebase.storage()
const store = firebase.storage()
const provider = new firebase.auth.GithubAuthProvider()

export { db, storage, store, auth, provider }
