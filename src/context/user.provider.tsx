import React, {useState, useEffect} from "react"

//third party
import firebase, {onAuthStateChanged} from "firebase/auth"

//contexts
import {UserContext} from "./user.context"

//utils
import {auth} from "../utils/firebase/firebase.utils"

type UserProviderProps = {
	children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({
	children,
}: UserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

	useEffect(() => {
		const unsubscribeFunc = onAuthStateChanged(auth, (firebaseUser) => {
			//console.log("USER FROM FIREBASE: ", firebaseUser)
			setCurrentUser(firebaseUser)
		})
		return unsubscribeFunc
	}, [])

	return (
		<UserContext.Provider value={{currentUser, setCurrentUser}}>
			{children}
		</UserContext.Provider>
	)
}
