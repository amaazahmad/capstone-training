//react imports
import React, { useEffect, useState, useRef } from "react"

//third party packes
import { useOutletContext } from "react-router-dom"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"

import './home.styles.css'

const HomePage = () => {
	type BlogData = {
		key: string,
		title: string,
		email: string,
		content: string,
		date: Date
	}

	// const [blogs, setBlogs] = useState<DocumentData[] | null>(null)
	const [blogs, setBlogs] = useState<BlogData[] | null>(null)
	const [filteredBlogs, setFilteredBlogs] = useState<BlogData[] | null>(null);
	const refSearchBar = useRef<HTMLInputElement>(null);

	// const { searchBarVisible, setSearchBarVisible } = useSearchBarOutletContext();
	type OutletContextType = [
		searchBarVisible: boolean,
		setSearchBarVisible: (visible: boolean) => {}
	]
	const [searchBarVisible, setSearchBarVisible] = useOutletContext<OutletContextType>()

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

	// useEffect(() => {
	// 	document.addEventListener('click', (event) => {

	// 		// console.log('EVENT TARGET: ', event.target);
	// 		// console.log("ref: ", refSearchBar.current?.value);
	// 		// console.log("VISIBLE: ", searchBarVisible);
	// 		if (event.target !== refSearchBar.current && searchBarVisible && !refSearchBar.current?.value) {

	// 			console.log("CLOSING SIDEBAR DUE TO OUTSIDE CLICK");
	// 			//console.log(event.target)
	// 			setSearchBarVisible(false)

	// 		}
	// 	}, true)
	// })

	const outsideClickHandler = (event: any) => {
		if (event.target !== refSearchBar.current && searchBarVisible && !refSearchBar.current?.value) {
			setSearchBarVisible(false)
		}
	}

	return (
		<div className=" mt-24 flex flex-col justify-center items-center ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl" onClick={outsideClickHandler}>
			<img className="w-5 md:ml-8 " src="/assets/icons/rectangle.svg" alt=""></img>
			<h1 className="font-lexend-deca font-normal text-xl leading-6 text-dark-gray-text-color md:ml-8">Latest</h1>
			<input ref={refSearchBar} className={searchBarVisible ? "inputBar" : "hidden"} onChange={searchChangeHandler} />
			<BlogList blogs={filteredBlogs} />
		</div>
	)
}

export default HomePage
