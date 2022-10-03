//react imports
import React, { useEffect, useState, useRef, useContext } from "react"

//third party packes
import { useOutletContext } from "react-router-dom"
import Switch from "react-switch";

//components
import BlogList from "../../components/blogList/blogList"

//contexts
import { ThemeContext } from "../../context/theme/theme.context"

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"

//types
import { BlogData } from '../../types/blog/blog'


const HomePage = () => {


	const { theme, setTheme } = useContext(ThemeContext);
	const [blogs, setBlogs] = useState<BlogData[] | null>(null)
	const [filteredBlogs, setFilteredBlogs] = useState<BlogData[] | null>(null);
	const refSearchBar = useRef<HTMLInputElement>(null);

	type OutletContextType = [
		searchBarVisible: boolean,
		setSearchBarVisible: (visible: boolean) => {}
	]
	const [searchBarVisible, setSearchBarVisible] = useOutletContext<OutletContextType>()

	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', updateScreenSize);
		return (() => { window.removeEventListener('resize', updateScreenSize) })
	})

	const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchField = event.target.value.toLowerCase()
		const filteredBlogs = blogs ? blogs.filter((blog) => { return blog.title.toLowerCase().includes(searchField) }) : blogs
		setFilteredBlogs(filteredBlogs);
	}

	useEffect(() => {

		const getBlogsAtHomePage = async () => {
			const blogsRec = await getBlogs()
			blogsRec.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })
			setBlogs(blogsRec)
			setFilteredBlogs(blogsRec)
		}

		getBlogsAtHomePage()
	}, [])

	const outsideClickHandler = (event: any) => {
		if (event.target !== refSearchBar.current && searchBarVisible && !refSearchBar.current?.value) {
			setSearchBarVisible(false)
		}
	}

	const themeChangeHandler = () => {
		localStorage.setItem('theme', !theme ? "dark" : "light")
		setTheme((!theme))
	}

	return (
		<div className={`${theme ? "bg-dark-gray-text-color" : ""} mt-24 flex flex-col justify-center  ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl`} onClick={outsideClickHandler}>
			<img className="w-5 ml-8 " src="/assets/icons/rectangle.svg" alt="" />
			<div className="flex flex-row w-full justify-between pr-8 pl-8 md:pl-0">
				<h1 className={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca font-normal text-xl leading-6  md:ml-8`}>
					Latest
				</h1>
				{screenWidth >= 768 ?
					<input
						ref={refSearchBar}
						className={`${searchBarVisible ? "mt-[52px] w-96 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-7 outline-hidden font-lexend-deca" : "w-0 duration-500"}`}
						onChange={searchChangeHandler}
					/>
					:
					<></>
				}
				<Switch
					checkedIcon={<img src="/assets/icons/sun.png" alt="" className="w-6 pt-1 pl-1" />}
					uncheckedIcon={<img src="/assets/icons/moon.png" alt="" className="w-6 pt-1 pl-1" />}
					checked={theme} onChange={themeChangeHandler}>
				</Switch>
			</div>
			<div>
				{screenWidth < 768 ?
					<input
						ref={refSearchBar}
						className={`${searchBarVisible ? "mt-[40px] w-64 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-7 outline-hidden font-lexend-deca" : "w-0 duration-500"}`}
						onChange={searchChangeHandler}
					/>
					:
					<></>
				}
			</div>
			<BlogList blogs={filteredBlogs} isMyBlogs={false} />
		</div>
	)
}

export default HomePage
