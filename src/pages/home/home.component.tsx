import {signOutUser} from "../../utils/firebase/firebase.utils"
import {useNavigate} from "react-router-dom"

function HomePage() {
	const navigate = useNavigate()
	const signOutHandler = () => {
		const resp = signOutUser()

		if (!(resp instanceof Error)) navigate("/login")
	}
	return (
		<div>
			<h1>Home Page</h1>
			<button onClick={signOutHandler}>SIGN OUT</button>
		</div>
	)
}

export default HomePage
