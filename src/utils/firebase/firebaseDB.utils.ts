import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
	doc, 
	deleteDoc,
	addDoc
} from "firebase/firestore"
import { BlogData } from "../../types/blog/blog"


import {firebaseApp} from "./firebase.utils"

const db = getFirestore()

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

export const deleteBlog = async (blogID:string) => {
	await deleteDoc(doc(db,"blogs",blogID))
}
	
export const createBlog = async(title:string, content:string, email:string, date:Date )=>{
	try{
		const collectionRef = collection(db, "blogs")
		await addDoc(collectionRef,{
			title,
			content,
			email,
			date
		});

		return "success";
	} catch(e) {
		return e
	}
}
