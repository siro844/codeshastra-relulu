
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD-yjLnaibCVKInluCw83DOvf1YZnkVRA",
  authDomain: "voiceassist-eaec2.firebaseapp.com",
  projectId: "voiceassist-eaec2",
  storageBucket: "voiceassist-eaec2.appspot.com",
  messagingSenderId: "363085319052",
  appId: "1:363085319052:web:b3466f2f80fce81429a4a9",
  measurementId: "G-HNTF4JCKB2"
};

const app = initializeApp(firebaseConfig);


export const googleProvider = new GoogleAuthProvider();
export const auth= getAuth(app)