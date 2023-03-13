import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeLP5WqzElqNk0bZhvy2kb90UFYBuh8Kg",
  authDomain: "nxus-8ec8d.firebaseapp.com",
  projectId: "nxus-8ec8d",
  storageBucket: "nxus-8ec8d.appspot.com",
  messagingSenderId: "516380934200",
  appId: "1:516380934200:web:2a681c4692c7a4679d26cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
