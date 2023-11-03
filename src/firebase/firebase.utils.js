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
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs  } from 'firebase/firestore';

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

//storing in database
export const addCollectionAndDocuments =async(collectionKey, objectsToAdd)=>{
  const collectionRef= collection(db, collectionKey );
  const batch = writeBatch(db);
 
  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await  batch.commit();
  console.log('done');
};
export const getCategoriesAndDocuments= async()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot =await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] =items;
    return acc;
  }, {});
  return categoryMap;
}
//endd



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