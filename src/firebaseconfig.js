
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyDhIEqTc21tC-dzBXIDaGw57Boue66SnSU",
  authDomain: "zapateria-568df.firebaseapp.com",
  projectId: "zapateria-568df",
  storageBucket: "zapateria-568df.firebasestorage.app",
  messagingSenderId: "1083438634227",
  appId: "1:1083438634227:web:3696443df2c2bdc1f49386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);