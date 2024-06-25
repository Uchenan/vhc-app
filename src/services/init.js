// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEYVnBdIiFc3e0WeqYdpVnzk5DNg816ec",
  authDomain: "testing-a94cf.firebaseapp.com",
  projectId: "testing-a94cf",
  storageBucket: "testing-a94cf.appspot.com",
  messagingSenderId: "564469992400",
  appId: "1:564469992400:web:46bfb7544c0a28ac7ec7d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// creating a firestore database instance
const db = getFirestore(app)

export default db 