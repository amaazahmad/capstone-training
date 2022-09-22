import React, {useEffect} from "react"
import "./App.css"
import LoginPage from "./pages/login/login.component"
import SignupPage from "./pages/signup/signup.component"
import HomePage from "./pages/home/home.component"
import {useNavigate} from "react-router-dom"

import {useContext} from "react"
import {UserContext} from "./context/user.context"

import {Routes, Route} from "react-router-dom"

function App() {
	const currentUser = useContext(UserContext)?.currentUser
	//const currentUser = getAuth().currentUser
	const navigate = useNavigate()

	useEffect(
		() => {
			console.log("CURRENT USER: ", currentUser)
			const path = currentUser ? "/" : "/login"
			// console.log("PATH CHANGED TO: ", path)
			navigate(path)
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentUser]
	)

	// useEffect(() => {
	// 	console.log("SECOND USE EFFECT")
	// 	const getUser = async () => {
	// 		await getAuth().currentUser
	// 		setUserRetrieved(true)
	// 	}
	// 	getUser()
	// })

	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup" element={<SignupPage />}></Route>
				<Route path="/" element={<HomePage />}></Route>
			</Routes>
		</div>
	)
}

export default App
