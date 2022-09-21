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
					<h1 className="welcomeHeading">Welcome</h1>
					<p className="welcomeSubHeading">Let's log you in quickly</p>
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
