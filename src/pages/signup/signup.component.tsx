import UserForm from "../../components/userForm/userForm.component";
import { Link } from "react-router-dom";

function SignupPage() {
	return (
		<div>
			<h1>SIGN UP</h1>
			<UserForm isLogin={false} />
			<Link to="../login">Go to Login</Link>
		</div>
	);
}

export default SignupPage;
