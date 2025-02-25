//firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjao1x06rhE6JX22PhgsW0isejGyLLjUI",
  authDomain: "arova-hotel.firebaseapp.com",
  projectId: "arova-hotel",
  storageBucket: "arova-hotel.firebasestorage.app",
  messagingSenderId: "32519177296",
  appId: "1:32519177296:web:b2da25a032ba2181e3bd55",
  measurementId: "G-1BSPVEBXJY"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence
setPersistence(auth, browserLocalPersistence);

// Export the necessary Firebase services
export { auth, db };