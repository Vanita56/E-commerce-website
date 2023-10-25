import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFaU0Eoj6dhDFUDng4rv5t20MH7QwtFwM",
    authDomain: "dav-clothing-db.firebaseapp.com",
    projectId: "dav-clothing-db",
    storageBucket: "dav-clothing-db.appspot.com",
    messagingSenderId: "1060891602715",
    appId: "1:1060891602715:web:661b500de3c65cbbe1edbe"
  };

const firebaseApp = initializeApp(firebaseConfig);

const google_provider = new GoogleAuthProvider();
// const facebook_provider = new FacebookAuthProvider();

google_provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, google_provider);
export const signInWithGoogleRedirect =()=> signInWithRedirect(auth, google_provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth)  return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword =async(email, password)=>{
  if(!email || !password)  return;

  return await createUserWithEmailAndPassword(auth, email, password);
} ;

export const signInAuthUserWithEmailAndPassword =async(email, password)=>{
  if(!email || !password)  return;

  return await signInWithEmailAndPassword(auth, email, password);
} ;

export const signOutUser = async ()=> await signOut(auth);