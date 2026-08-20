import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAe6zYdE_tJoD7oH0yzI3rBchNnzVZP0-8',
  authDomain: 'course-project-5e6c2.firebaseapp.com',
  projectId: 'course-project-5e6c2',
  storageBucket: 'course-project-5e6c2.appspot.com',
  messagingSenderId: '545951038997',
  appId: '1:545951038997:web:d358abb258154ce810181c',
  measurementId: 'G-3YPL21PL82',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');

const providerFacebook = new FacebookAuthProvider();
providerFacebook.addScope('user_birthday');

export const signInWithGoogle = () => signInWithPopup(auth, providerGoogle);

export const signInWithFacebook = () => signInWithPopup(auth, providerFacebook);
