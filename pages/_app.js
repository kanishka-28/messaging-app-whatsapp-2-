import 'tailwindcss/tailwind.css'
import firebase from "firebase";
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {db, auth} from "../firebase"
import Login from '../components/Login'
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {
          merge: true
        }
      )
    }
  }, [user])
  if(loading) return <Loading/>
  if(!user) return <Login/>
  return <Component {...pageProps} />
}

export default MyApp