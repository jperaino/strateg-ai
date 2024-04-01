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
  apiKey: "AIzaSyCnzYabJzxqfZSmwsLUVFOdDfX1MtGika0",
  authDomain: "strategai-f7b58.firebaseapp.com",
  projectId: "strategai-f7b58",
  storageBucket: "strategai-f7b58.appspot.com",
  messagingSenderId: "325273673330",
  appId: "1:325273673330:web:c928db8866dd51aae7aceb",
  measurementId: "G-QXLM911CVP",
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
