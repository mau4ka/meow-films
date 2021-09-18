import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyB2e0515TxOAZ3ZHHnJg1iPBegWdnDcpQ0",
  authDomain: "meowfilms.firebaseapp.com",
  projectId: "meowfilms",
  storageBucket: "meowfilms.appspot.com",
  messagingSenderId: "941993200992",
  appId: "1:941993200992:web:b2c9f4a6d3fe16fff4e205",
};

const firebase = Firebase.initializeApp(config);

export { firebase };
