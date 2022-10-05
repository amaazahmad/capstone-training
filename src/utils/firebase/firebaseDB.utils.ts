import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
	doc, 
	deleteDoc,
	addDoc,
	updateDoc,
	getDoc
} from "firebase/firestore"

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

export const getBlogByID = async (blogID:string) => {
	// const collectionRef = collection(db, "blogs")
	// const queryResponse =  blogID? query(collectionRef, where('key','==',blogID) ):query(collectionRef) 

	// const querySnapshotDocs = (await getDocs(queryResponse)).docs

	// const {title, email, content, date} = querySnapshotDocs[0].data();
	// 	const returnObj = {title,email,content,date:date.toDate(), key:querySnapshotDocs[0].id}
	// 	return returnObj;
	const docRef = doc(db,'blogs',blogID);
	try {
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	 } catch(error) {
		return undefined;
	 }

}

export const deleteBlog = async (blogID:string) => {
	await deleteDoc(doc(db,"blogs",blogID))
}
	
export const createBlog = async(title:string, content:string, email:string, date:Date )=>{
	try{
		const collectionRef = collection(db, "blogs")
		const response = await addDoc(collectionRef,{
			title,
			content,
			email,
			date
		});

		return response.id;
	} catch(e) {
		return e
	}
}

export const updateBlog = async(key:string, title:string, content:string)=>{
	try{
		const blogRef = doc(db,'blogs',key)
		await updateDoc(blogRef,{title, content})
		return 'success'
	}catch(e){
		return e;
	}
	
	
}