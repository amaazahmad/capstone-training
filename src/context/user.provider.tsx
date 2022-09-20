import React from "react"
import {useState, useEffect} from "react"
import {UserContext} from "./user.context"
import firebase, {onAuthStateChanged} from "firebase/auth"
import {auth} from "../utils/firebase/firebase.utils"

type UserProviderProps = {
	children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = (
	props: UserProviderProps
) => {
	const {children} = props
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
	const value = {currentUser, setCurrentUser}

	useEffect(() => {
		const unsubscribeFunc = onAuthStateChanged(auth, (firebaseUser) => {
			setCurrentUser(firebaseUser)
		})
		return unsubscribeFunc
	}, [])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
