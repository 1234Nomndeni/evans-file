import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/performance"
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyADk94g6iWNHDgYYpNMGGVO73h2ioge1OY",
  authDomain: "melbite.firebaseapp.com",
  projectId: "melbite",
  storageBucket: "melbite.appspot.com",
  messagingSenderId: "333555328962",
  appId: "1:333555328962:web:a2367482248c38ee1bd85b",
  measurementId: "G-KFB29JC15S",
  // measurementId: "G-QJTRSCZ930"

});

const analytics  = getAnalytics(firebaseApp);
logEvent(analytics, 'click',{
  name: "Page_Clicked"
})
const db = firebaseApp.firestore()
const auth = firebase.auth();
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()
const gitProvider = new firebase.auth.GithubAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider();
export { analytics, db, storage, auth, provider, gitProvider, twitterProvider }


// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyD5ZbRMnRdqubGNSc2KzEVDg2fKizxbniU",
//     authDomain: "blog-594a2.firebaseapp.com",
//     projectId: "blog-594a2",
//     storageBucket: "blog-594a2.appspot.com",
//     messagingSenderId: "554911575314",
//     appId: "1:554911575314:web:5462233055b1566e4e57cb",
//     measurementId: "G-F92XYFF2VB"
// });