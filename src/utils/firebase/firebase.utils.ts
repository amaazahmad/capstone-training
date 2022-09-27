import {initializeApp} from "firebase/app"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	signOut,
} from "firebase/auth"
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const firebaseAapp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseAapp)

export const createUserAccount = async (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userObjInResponse) => {
			return userObjInResponse
		})
		.catch((error) => {
			return error
		})
}

export const signInUser = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userObjInResponse) => {
			return userObjInResponse
		})
		.catch((error) => {
			return error
		})
}

export const signOutUser = async () => {
	return signOut(auth)
		.then((resp) => {
			return resp
		})
		.catch((error) => {
			return error
		})
}
