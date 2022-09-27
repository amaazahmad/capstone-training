import { createContext } from "react"

import firebase from "firebase/auth"

type UserContextType = {
	currentUser: firebase.User | null
	setCurrentUser: (user: firebase.User) => void
}

export const UserContext = createContext<UserContextType | null>(null)
