import UserForm from "../../components/userForm/userForm.component"
import {Link} from "react-router-dom"

function LoginPage() {
	console.log("LOGIN PAGE RENDERED")
	return (
		<div>
			<h1>This is login</h1>
			<UserForm isLogin={true} />
			<Link to="../signup">Go to Signup</Link>
		</div>
	)
}

export default LoginPage
