import {useNavigate} from "react-router-dom"

import {signOutUser} from "../../utils/firebase/firebase.utils"

const HomePage = () => {
	const navigate = useNavigate()
	const signOutHandler = () => {
		const response = signOutUser()

		if (!(response instanceof Error)) navigate("/login")
	}
	return (
		<div>
			<h1>Home Page</h1>
			<button onClick={signOutHandler}>SIGN OUT</button>
		</div>
	)
}

export default HomePage
