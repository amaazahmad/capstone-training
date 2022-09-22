// React Imports
import React, {useEffect, useContext} from "react"

//third party packages
import {Routes, Route, useNavigate} from "react-router-dom"

//components
import LoginPage from "./pages/login/login.component"
import SignupPage from "./pages/signup/signup.component"
import HomePage from "./pages/home/home.component"

//contexts
import {UserContext} from "./context/user.context"

//styles
import "./App.css"

function App() {
	const currentUser = useContext(UserContext)?.currentUser
	const navigate = useNavigate()

	useEffect(
		() => {
			const path = currentUser ? "/" : "/login"
			navigate(path)
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentUser]
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
