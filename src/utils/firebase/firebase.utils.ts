import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
} from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyBhKb0MOulldYv0eQ8Znfr5-7ng_Sh5pXQ",

	authDomain: "react-capstone-123b7.firebaseapp.com",

	projectId: "react-capstone-123b7",

	storageBucket: "react-capstone-123b7.appspot.com",

	messagingSenderId: "692113554516",

	appId: "1:692113554516:web:c29a78e49178258e9c01c1",
};

// Initialize Firebase

const firebaseAapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseAapp);

export const createUserAccount = async (email: string, password: string) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userObjInResponse) => {
			return userObjInResponse;
		})
		.catch((error) => {
			return error;
		});
};

export const signInUser = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userObjInResponse) => {
			return userObjInResponse;
		})
		.catch((error) => {
			return error;
		});
};
