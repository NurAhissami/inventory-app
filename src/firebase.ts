import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyyizcxbrGNchqjE2UtH_MKx4-pLI9JPo",
  authDomain: "inventory-app-d43e9.firebaseapp.com",
  projectId: "inventory-app-d43e9",
  storageBucket: "inventory-app-d43e9.appspot.com",
  messagingSenderId: "533550915465",
  appId: "1:533550915465:web:1e3fe0742bbff9adbd4b58",
};

// Initialize Firebase
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

export const storage = getStorage(app);
