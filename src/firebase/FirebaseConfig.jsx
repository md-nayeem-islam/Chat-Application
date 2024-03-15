import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAgqOVsAqu_kiWrVU3jaFpKwoyQ4o9hOo",
  authDomain: "chat-application-b8c5d.firebaseapp.com",
  projectId: "chat-application-b8c5d",
  storageBucket: "chat-application-b8c5d.appspot.com",
  messagingSenderId: "699377460086",
  appId: "1:699377460086:web:3384788d671a43ad181057"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebaseConfig;