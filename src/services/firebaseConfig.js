import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJJP9Z_wgwgdy7bTg8rLSYGELjhOmt2ck",
  authDomain: "easylocproj.firebaseapp.com",
  projectId: "easylocproj",
  storageBucket: "easylocproj.appspot.com",
  messagingSenderId: "211373958395",
  appId: "1:211373958395:web:74387a653e1d3007727c5e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);