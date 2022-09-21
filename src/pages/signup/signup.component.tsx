import UserForm from "../../components/userForm/userForm.component"
import {Link} from "react-router-dom"

import "./signup.styles.css"

function SignupPage() {
	return (
		<div className="fullPageContainer">
			<div className="leftImageContainer">
				<h1 className="leftText">Sign Up</h1>
			</div>
			<div className="loginContainer">
				<div className="welcomeTextContainer">
					<h1 className="welcomeHeading">Welcome</h1>
					<p className="welcomeSubHeading">Let's sign you up quickly</p>
				</div>
				<UserForm isLogin={false} />

				<p className="bottomText">
					Already have an account?
					<Link
						style={{color: "rgba(86, 204, 106, 1)", textDecoration: 0}}
						to="../login"
					>
						{" Log-in"}
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignupPage
