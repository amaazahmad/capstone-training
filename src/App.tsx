import React, { useEffect } from "react"

import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged, getAuth } from "firebase/auth"

import SignupPage from "./pages/signup/signup.component"
import LoginPage from "./pages/login/login.component"
import HomePage from "./pages/home/home.component"
import Sidebar from "./components/sidebar/sidebar.component"
import MyBlogs from "./pages/myBlogs/myBlogs"
import BlogView from "./pages/blogView/blogView.component"


const App = () => {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(
		() => {
			const auth = getAuth()
			onAuthStateChanged(auth, (user) => {
				if (!user)
					navigate('/login')
				else {
					if (location.pathname === '/login' || location.pathname === '/signup')
						navigate('/')
				}
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return (
		<div className=" text-center box-border">
			<Routes>
				<Route path='/' element={<Sidebar />}>
					<Route index={true} element={<HomePage />} />
					<Route path="my-blogs" element={<MyBlogs />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/blog/:blogID" element={<BlogView />} />
			</Routes>
		</div>
	)
}

export default App
