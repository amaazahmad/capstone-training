import {
	getFirestore,
	collection,
	query,
	getDocs,
	where
} from "firebase/firestore"

import {firebaseApp} from "./firebase.utils"

const db = getFirestore(firebaseApp)


export const getBlogs = async (emailFilter:string|null="") => {
	const collectionRef = collection(db, "blogs")
	const queryResponse =  emailFilter ?  query(collectionRef, where('email','==',emailFilter) ):query(collectionRef) 

	const querySnapshotDocs = (await getDocs(queryResponse)).docs
	
	return querySnapshotDocs.map((snapshot) => {
		const {title, email, content, date} = snapshot.data();
		const returnObj = {title,email,content,date:date.toDate(), key:snapshot.id}
		return returnObj;
		
	})
}
	
	
