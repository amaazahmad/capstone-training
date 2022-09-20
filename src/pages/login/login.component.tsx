import UserForm from "../../components/userForm/userForm.component"
import {Link} from "react-router-dom"

import "./login.styles.css"

function LoginPage() {
	console.log("LOGIN PAGE RENDERED")
	return (
		<div className="fullPageContainer">
			<div className="leftImageContainer">
				<h1 className="leftText">Login</h1>
			</div>
			<div className="loginContainer">
				<div className="welcomeTextContainer">
					<h1
						style={{
							fontFamily: "DM Serif Display",
							margin: 0,
							fontWeight: "300",
						}}
					>
						Welcome
					</h1>
					<p
						style={{
							fontFamily: "Lexend Deca",
							color: "rgba(165, 165, 165, 1)",
							margin: 0,
						}}
					>
						Let's log you in quickly
					</p>
				</div>
				<UserForm isLogin={true} />
				<p className="bottomText">
					Don't have an account?
					<Link
						style={{color: "rgba(86, 204, 106, 1)", textDecoration: 0}}
						to="../signup"
					>
						{" "}
						Signup
					</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
