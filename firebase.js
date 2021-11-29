import firebase from "firebase";
// import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCR9PWV4BYnDslOTitt-zd2DB8M-71F0CE",
    authDomain: "whatsapp-clone-c5dd3.firebaseapp.com",
    projectId: "whatsapp-clone-c5dd3",
    storageBucket: "whatsapp-clone-c5dd3.appspot.com",
    messagingSenderId: "220052695798",
    appId: "1:220052695798:web:7bb512d69d5564cff6dad7"
  };

// if the firebase app is initialized then move on with config else initialize it first 
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// const app = firebase.initializeApp(firebaseConfig);
// const app = firebase.app()

// const db = app.database();       //database ka instance
const db = app.firestore();       //database ka instance
const auth = app.auth();         //authentication ka instance
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase;