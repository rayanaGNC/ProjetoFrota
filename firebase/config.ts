import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHQwGybqohdKrCtMECMPA69L-6BTvgxY8",
  authDomain: "gestor-frota-16fc3.firebaseapp.com",
  projectId: "gestor-frota-16fc3",
  storageBucket: "gestor-frota-16fc3.firebasestorage.app",
  messagingSenderId: "648853271721",
  appId: "1:648853271721:web:c8c1e2e9973df7d74825b8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
