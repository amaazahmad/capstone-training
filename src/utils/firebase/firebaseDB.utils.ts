import {
	getFirestore,
	collection,
	query,
	getDocs,
} from "firebase/firestore"

import {firebaseApp} from "./firebase.utils"

const db = getFirestore(firebaseApp)


export const getBlogs = async () => {
	const collectionRef = collection(db, "blogs")
	const queryResponse = query(collectionRef)

	const querySnapshotDocs = (await getDocs(queryResponse)).docs

	return querySnapshotDocs.map((snapshot) => {
		return snapshot.data()
	})
}
