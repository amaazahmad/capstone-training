import React from "react";
import "./App.css";
import LoginPage from "./pages/login/login.component";
import SignupPage from "./pages/signup/signup.component";
import HomePage from "./pages/home/home.component";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Navigate to="/login" />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup" element={<SignupPage />}></Route>
				<Route path="/home" element={<HomePage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
