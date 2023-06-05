import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/performance";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
// import { getPerformance } from "firebase/performance";

const firebaseApp = firebase.initializeApp({});

const analytics = getAnalytics(firebaseApp);
logEvent(analytics, "click", {
  name: "Page_Clicked",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const gitProvider = new firebase.auth.GithubAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const perf = getPerformance(firebaseApp);

export {
  analytics,
  perf,
  db,
  storage,
  auth,
  provider,
  gitProvider,
  twitterProvider,
};

// deployment and avoid cloud functions => firebase deploy --except functions
