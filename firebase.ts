// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA5UP-D0r-sZQ7LytirVUILWf0vtPrqAI",
  authDomain: "netflix-clone-ff087.firebaseapp.com",
  databaseURL: 'https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com',
  projectId: "netflix-clone-ff087",
  storageBucket: "netflix-clone-ff087.appspot.com",
  messagingSenderId: "109535669878",
  appId: "1:109535669878:web:bf2ee72efcc8a58be3b957"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }