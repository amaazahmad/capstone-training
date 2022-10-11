import React, { useState, useEffect } from "react"

import firebase, { onAuthStateChanged } from "firebase/auth"

import { UserContext } from "./user.context"

import { auth } from "../../utils/firebase/firebase.utils"

type UserProviderProps = {
	children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

	useEffect(() => {
		const unsubscribeFunc = onAuthStateChanged(auth, (firebaseUser) => {
			setCurrentUser(firebaseUser)
		})
		return unsubscribeFunc
	}, [])

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	)
}
