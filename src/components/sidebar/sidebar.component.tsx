//react imports
import { useContext } from "react"

//third party packages
import { Outlet, useNavigate } from "react-router-dom"

//contexts
import { UserContext } from "../../context/user.context"

//utils
import { signOutUser } from "../../utils/firebase/firebase.utils"

//styles
import "./sidebar.styles.css"

const Sidebar = () => {
	const navigate = useNavigate();
	const user = useContext(UserContext);
	const displayName = user?.currentUser?.displayName
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
					<span className="sidebar-usericon-text">{displayName?.slice(0,1).toUpperCase()}</span>
					<p className=" sidebar-text sidebar-username-text">{displayName}</p>
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
