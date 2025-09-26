
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB4TfDFvEh8PbOpjuy4hVuuUz2RTbsI9ME",
  authDomain: "ai-trip-planner-f31d9.firebaseapp.com",
  projectId: "ai-trip-planner-f31d9",
  storageBucket: "ai-trip-planner-f31d9.firebasestorage.app",
  messagingSenderId: "719404761599",
  appId: "1:719404761599:web:1eb3f40dcf4f0cbef167ca",
  measurementId: "G-C7ZKCQP285"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);