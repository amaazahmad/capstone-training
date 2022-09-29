//react imports
import { useContext, useState } from "react"

//third party packages
import { Outlet, useNavigate, useLocation } from "react-router-dom"

//contexts
import { UserContext } from "../../context/user/user.context"
import { ThemeContext } from "../../context/theme/theme.context"

//utils
import { signOutUser } from "../../utils/firebase/firebase.utils"

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { theme } = useContext(ThemeContext);
	const user = useContext(UserContext);
	const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
	const displayName = user?.currentUser?.displayName
	const signOutHandler = () => {
		const response = signOutUser()

		if (!(response instanceof Error)) navigate("/login")

	}

	const userIconClickHandler = () => {
		location.pathname !== '/my-blogs' && navigate('/my-blogs');
	}

	const searchClickHandler = () => {
		setSearchBarVisible(!searchBarVisible);
	}

	return (
		<div className="flex flex-col-reverse h-screen xl:flex-row z-10">

			<div className={`${theme ? " shadow-sidebar-box-light-shadow" : "shadow-sidebar-box-dark-shadow"}  bg-dark-gray-text-color z-10 h-[7%] static flex flex-row justify-around items-center
			xl:h-full xl:flex-col xl:justify-start xl:w-[8%]`}>
				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12" >
					<img className="w-8 xl:w-16 xl:mt-8 cursor-pointer" src="/assets/icons/ellipse.svg" alt="" onClick={userIconClickHandler}></img>
					<span className="text-white font-lexend-deca font-normal text-xl leading-6 absolute left-auto xl:mt-8 xl:text-3xl xl:leading-10 cursor-pointer" onClick={userIconClickHandler}>{displayName?.slice(0, 1).toUpperCase()} </span>
					<p className="hidden md:fixed md:pl-20 md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1 xl:hidden cursor-pointer" onClick={userIconClickHandler}>{displayName}</p>
				</div>

				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12" onClick={searchClickHandler}>
					<img className="w-8" src="/assets/icons/search.svg" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1 ">search</p>
				</div>


				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12">
					<img className="w-8" src="/assets/icons/add_circle.svg" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">create</p>
				</div>

				<div className="cursor-pointer md:flex md:flex-row md:items-center xl:flex xl:flex-col xl:items-center xl:mt-auto xl:mb-8" onClick={signOutHandler}>
					<img className="w-8" src="/assets/icons/logout.png" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">signout</p>
				</div>



			</div>

			<div className={`${theme ? " bg-dark-gray-text-color" : ""} overflow-scroll top-0 h-[93%] xl:w-[92%] xl:h-[100%]`}>
				<Outlet context={[searchBarVisible, setSearchBarVisible]} />
			</div>
		</div>

	)
}

export default Sidebar
