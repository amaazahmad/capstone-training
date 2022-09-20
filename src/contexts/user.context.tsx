import firebase from "firebase/auth"
import {createContext} from "react"

type UserContextType = {
	currentUser: firebase.User | null
	setCurrentUser: (user: firebase.User) => void
}

export const UserContext = createContext<UserContextType | null>(null)
