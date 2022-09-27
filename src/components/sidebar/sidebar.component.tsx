//react imports
import { useContext } from "react"

//third party packages
import { Outlet, useNavigate } from "react-router-dom"

//contexts
import { UserContext } from "../../context/user.context"

//utils
import { signOutUser } from "../../utils/firebase/firebase.utils"

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
		<div className="flex flex-col-reverse h-screen xl:flex-row">
			
			<div className="shadow-sidebar-box-shadow bg-dark-gray-text-color h-[7%] static flex flex-row justify-around items-center
			xl:h-full xl:flex-col xl:justify-start xl:w-[8%] ">
				<div  className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12" onClick={userIconClickHandler}>
					<img className="w-8 xl:w-16 xl:mt-8" src="/assets/icons/ellipse.svg" alt=""></img>
					<span className="text-white font-lexend-deca font-normal text-xl leading-6 absolute left-auto xl:mt-8 xl:text-3xl xl:leading-10">{displayName?.slice(0,1).toUpperCase()}</span>
					<p className="hidden md:fixed md:pl-20 md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1 xl:hidden">{displayName}</p>
				</div>
				

				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12">
					<img className="w-8" src="/assets/icons/search.svg" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1 ">search</p>
				</div>

				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12">
					<img className="w-8" src="/assets/icons/add_circle.svg" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">create</p>
				</div>

				<div className="hidden xl:cursor-pointer xl:flex xl:flex-col xl:items-center xl:mt-auto xl:mb-8" onClick={signOutHandler}>
					<img className="w-8" src="/assets/icons/logout.png" alt="" />
					<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">signout</p>
				</div>
				
			</div>
			
			<div className="overflow-scroll top-0 h-[93%] xl:w-[92%]">
			<Outlet/>
			</div>
		</div>
		
	)
}

export default Sidebar
