import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpetwtkw3Xzs80UOFnScKrZ0mkA-D3GWI",
  authDomain: "tree-map-8a46f.firebaseapp.com",
  databaseURL: "https://tree-map-8a46f-default-rtdb.firebaseio.com", 
  projectId: "tree-map-8a46f",
  storageBucket: "tree-map-8a46f.firebasestorage.app",
  messagingSenderId: "356737503499",
  appId: "1:356737503499:web:8df3cc1a2e1348e930120e",
};

// Next.js Fast Refresh Fix
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);