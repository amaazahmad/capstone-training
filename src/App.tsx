// React Imports
import React, {useEffect} from "react"

//third party packages
import {Routes, Route, useNavigate} from "react-router-dom"
import {onAuthStateChanged, getAuth} from "firebase/auth"

//components
import LoginPage from "./pages/login/login.component"
import SignupPage from "./pages/signup/signup.component"
import HomePage from "./pages/home/home.component"

//styles
import "./App.css"

function App() {
	const navigate = useNavigate()

	useEffect(
		() => {
			const auth = getAuth()
			onAuthStateChanged(auth, (user) => {
				const path = user ? "/" : "/login"
				navigate(path)
			})
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

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
