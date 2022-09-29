// React Imports
import React, { useEffect, useContext } from "react"

//third party packages
import { Routes, Route, useNavigate } from "react-router-dom"
import { onAuthStateChanged, getAuth } from "firebase/auth"

//components
import SignupPage from "./pages/signup/signup.component"
import LoginPage from "./pages/login/login.component"
import HomePage from "./pages/home/home.component"
import Sidebar from "./components/sidebar/sidebar.component"
import MyBlogs from "./pages/myBlogs/myBlogs"
import BlogView from "./pages/blogView/blogView.component"

//contexts
import { ThemeContext } from "./context/theme/theme.context"

//styles
import "./App.css"

function App() {
	const navigate = useNavigate()
	const { setTheme } = useContext(ThemeContext)



	useEffect(
		() => {
			// the onAuthStateChanged function is used here instead of getting the current user from context because it had a delay. The login screen flashed each time a logged-in user refreshed the home page. The usage of onAuthStateChanged fixes it.
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
				<Route path='/' element={<Sidebar />}>
					<Route index={true} element={<HomePage />} />
					<Route path="my-blogs" element={<MyBlogs />} />
				</Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup" element={<SignupPage />}></Route>
				<Route path="/blog/:blogID" element={<BlogView />} />
			</Routes>
		</div>
	)
}

export default App
