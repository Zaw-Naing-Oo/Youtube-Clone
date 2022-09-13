
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDdBSJqsBZwCdf7qErS1qYmHqIpIAgun9w",
  authDomain: "video-2b7f7.firebaseapp.com",
  projectId: "video-2b7f7",
  storageBucket: "video-2b7f7.appspot.com",
  messagingSenderId: "949839331711",
  appId: "1:949839331711:web:97d7ad7792172e3a535a4a",
  measurementId: "G-EVFNSD65RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app