import { useContext, useState, useEffect } from "react"

import { Outlet, useNavigate, useLocation } from "react-router-dom"
import Popup from 'reactjs-popup';

import EditBlog from "../editBlog/editBlog.component";
import SignoutWarning from "../signoutWarning/signoutWarning";

import { UserContext } from "../../context/user/user.context"
import { ThemeContext } from "../../context/theme/theme.context"


const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { theme } = useContext(ThemeContext);
	const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
	const [createBlogPopup, setCreateBlogPopup] = useState<boolean>(false);
	const [signoutWarning, setSignoutoutWarning] = useState<boolean>(false);
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
	const displayName = useContext(UserContext)?.currentUser?.displayName

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
	}

	const userIconClickHandler = () => {
		location.pathname !== '/my-blogs' ? navigate('/my-blogs') : navigate("/");
	}

	const searchClickHandler = () => {
		setSearchBarVisible(!searchBarVisible);
	}

	useEffect(() => {
		window.addEventListener('resize', updateScreenSize);
		return (() => { window.removeEventListener('resize', updateScreenSize) })
	})

	return (
		<div className="flex flex-col-reverse h-screen xl:flex-row z-10">

			<div className={`${theme ? " shadow-sidebar-box-light-shadow" : "shadow-sidebar-box-dark-shadow"}  bg-dark-gray-text-color z-10 h-[7%] static flex flex-row justify-around items-center
			xl:h-full xl:flex-col xl:justify-start xl:w-[8%]`}>
				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12" >
					<img className="w-8 xl:w-16 xl:mt-8 cursor-pointer" src="/assets/icons/ellipse.svg" alt="" onClick={userIconClickHandler} />
					<span className="text-white font-lexend-deca font-normal text-xl leading-6 absolute left-auto xl:mt-8 xl:text-3xl xl:leading-10 cursor-pointer" onClick={userIconClickHandler}>{displayName?.slice(0, 1).toUpperCase()} </span>
					<p className="hidden md:fixed md:pl-20 md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-5 xl:hidden cursor-pointer" onClick={userIconClickHandler}>{displayName}</p>
				</div>

				<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12" >
					<img className=" cursor-pointer w-8" src="/assets/icons/search.svg" alt="" onClick={searchClickHandler} />
					<p className=" cursor-pointer hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1 " onClick={searchClickHandler}>search</p>
				</div>

				<Popup
					defaultOpen={createBlogPopup}
					open={createBlogPopup}
					onOpen={() => { setCreateBlogPopup(true) }}
					onClose={() => { setCreateBlogPopup(false) }}
					contentStyle={{ padding: 0, border: 0, width: '75%', height: '70%' }}
					modal
					closeOnDocumentClick={false}
					repositionOnResize
					trigger={<div className="flex flex-row justify-center items-center xl:flex-col xl:w-full xl:mb-12">
						<img className="w-8" src="/assets/icons/addCircle.svg" alt="" />
						<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">create</p>
					</div>}
				>
					<button className=" cursor-pointer absolute block pt-1 pb-2 pr-2 pl-2 leading-5 -right-2 -top-2 text-2xl bg-white border-2 border-solid border-green-text-color rounded-xl" onClick={() => { setCreateBlogPopup(false) }}>&times;</button>
					<EditBlog setEditPopup={setCreateBlogPopup} />
				</Popup>

				<Popup
					defaultOpen={signoutWarning}
					open={signoutWarning}
					onOpen={() => { setSignoutoutWarning(true) }}
					onClose={() => { setSignoutoutWarning(false) }}
					contentStyle={screenWidth >= 768 ? { padding: 0, border: 0 } : { padding: 0, border: 0, width: '85%' }}
					modal
					closeOnDocumentClick={false}
					repositionOnResize
					trigger={
						<div className="cursor-pointer md:flex md:flex-row md:items-center xl:flex xl:flex-col xl:items-center xl:mt-auto xl:mb-8" >
							<img className="w-8" src="/assets/icons/logout.png" alt="" />
							<p className="hidden md:block md:font-lexend-deca md:not-italic md:font-normal md:text-xl md:leading-6 md:text-white md:ml-1">signout</p>
						</div>
					}
				>
					<button className=" cursor-pointer absolute block pt-1 pb-2 pr-2 pl-2 leading-5 -right-2 -top-2 text-2xl bg-white border-2 border-solid border-green-text-color rounded-xl" onClick={() => { setSignoutoutWarning(false) }}>&times;</button>
					<SignoutWarning setSignoutWarning={setSignoutoutWarning} />
				</Popup>
			</div>

			<div className={`${theme ? " bg-dark-gray-text-color" : ""} overflow-scroll top-0 h-[93%] xl:w-[92%] xl:h-[100%]`}>
				<Outlet context={[searchBarVisible, setSearchBarVisible]} />
			</div>
		</div>

	)
}

export default Sidebar
