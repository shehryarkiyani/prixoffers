import {initializeApp} from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAw0VUMglWCOUv2Z30IvJRRdd10YnDW82s",
  authDomain: "prix-offers.firebaseapp.com",
  projectId: "prix-offers",
  storageBucket: "prix-offers.appspot.com",
  messagingSenderId: "1064715705590",
  appId: "1:1064715705590:web:a23d59b096bf9cbeb9a0d7",
  measurementId: "G-X3P6VSTW4E"
};
  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const provider=new GoogleAuthProvider();
  export {app,auth,provider}


