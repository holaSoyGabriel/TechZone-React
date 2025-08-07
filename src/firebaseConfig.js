// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJyTVzJr4WA5rTKkTeIP_A4b7spw1TZj0",
  authDomain: "arcadia-1463b.firebaseapp.com",
  projectId: "arcadia-1463b",
  storageBucket: "arcadia-1463b.firebasestorage.app",
  messagingSenderId: "199867100332",
  appId: "1:199867100332:web:d2ea5e2bef8dc0a80b8309",
  measurementId: "G-DRRVGK7XGJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };