import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9i2DszvoHB9jFWUL02MdFKrq1-6Z5kko",
  authDomain: "todo-d9b1f.firebaseapp.com",
  projectId: "todo-d9b1f",
  storageBucket: "todo-d9b1f.appspot.com",
  messagingSenderId: "860582098317",
  appId: "1:860582098317:web:d7ceca63c35c1439e179c4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
