import React, {useEffect} from "react"
import "./App.css"
import LoginPage from "./pages/login/login.component"
import SignupPage from "./pages/signup/signup.component"
import HomePage from "./pages/home/home.component"
import {useNavigate} from "react-router-dom"

import {useContext} from "react"
import {UserContext} from "./contexts/user.context"

import {Routes, Route} from "react-router-dom"

function App() {
	const currentUser = useContext(UserContext)?.currentUser

	const navigate = useNavigate()

	useEffect(() => {
		const path = currentUser ? "/" : "/login"
		console.log("PATH CHANGED TO: ", path)
		navigate(path)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])
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
