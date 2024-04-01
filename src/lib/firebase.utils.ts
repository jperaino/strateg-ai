// See https://ariangarshi.medium.com/how-to-use-firebase-for-google-authentication-in-a-react-js-in-2022-78171a235404
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLA-Uhtnlo9jSidBHG7qkU3Ry3TJ0dTQs",
  authDomain: "fir-vite-ui.firebaseapp.com",
  projectId: "fir-vite-ui",
  storageBucket: "fir-vite-ui.appspot.com",
  messagingSenderId: "848773404383",
  appId: "1:848773404383:web:99fa25a6cf79aa918dfb6a",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
// Whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});

// Initialize Firestore
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const firebaseSignOut = () => signOut(auth);
