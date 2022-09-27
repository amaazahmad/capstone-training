//third party packages
import { Outlet, useNavigate } from "react-router-dom"

//utils
import { signOutUser } from "../../utils/firebase/firebase.utils"

//styles
import "./sidebar.styles.css"

const Sidebar = () => {
	const navigate = useNavigate();
	const signOutHandler = () => {
		const response = signOutUser()

		if (!(response instanceof Error)) navigate("/login")
		
	}

	const userIconClickHandler = () => {
		navigate('/my-blogs');
	}

	return (
		<div className="full-container">
			
			<div className="sidebar-container">
				<div style={{position:'relative', cursor:'pointer'}} className="sidebar-icon-container" onClick={userIconClickHandler}>
					<img className="sidebar-icon sidebar-user-icon" src="/assets/icons/ellipse.svg" alt=""></img>
					<span className="sidebar-usericon-text">U</span>
					<p className=" sidebar-text sidebar-username-text">ABCEFFF</p>
				</div>
				

				<div className="sidebar-icon-container">
					<img className="sidebar-icon" src="/assets/icons/search.svg" alt="" />
					<p className="sidebar-text">search</p>
				</div>

				<div className="sidebar-icon-container">
					<img className="sidebar-icon" src="/assets/icons/add_circle.svg" alt="" />
					<p className="sidebar-text">create</p>
				</div>

				<div className="sidebar-signout-container" onClick={signOutHandler}>
					<img className="sidebar-icon" src="/assets/icons/logout.png" alt="" />
					<p className="sidebar-text">signout</p>
				</div>
				
			</div>
			
			<div className="content-container">
			<Outlet/>
			</div>
		</div>
		
	)
}

export default Sidebar
