import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCLyb9K1HxGZ14J_Tqe_AgKCOzIcVas5_o",
	authDomain: "csvista-6ea44.firebaseapp.com",
	projectId: "csvista-6ea44",
	storageBucket: "csvista-6ea44.appspot.com",
	messagingSenderId: "176305190759",
	appId: "1:176305190759:web:37b7ef75eaa5311e37e1c2",
	measurementId: "G-7SDFYYZRJ8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
