//react imports
import {useEffect, useState} from "react"

//third party packes
import {DocumentData} from "firebase/firestore"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import {getBlogs} from "../../utils/firebase/firebaseDB.utils"

import "./home.styles.css"

const HomePage = () => {

	const [blogs, setBlogs] = useState<DocumentData[] | null>(null)

	useEffect(() => {
		
		const getBlogsAtHomePage = async () => {
			const blogs = await getBlogs()
			blogs.sort((objA, objB) => {return Number(objB.date) - Number(objA.date)})
			//const blogs: DocumentData[] = []   empty array for testing
			setBlogs(blogs)
		}
		getBlogsAtHomePage()
	}, [])

	return (
		<div className="homepage-container">
			<img className="dash-icon" src="/assets/icons/rectangle.svg" alt=""></img>
			<h1 className="page-heading">Latest</h1>
			<BlogList blogs={blogs} />
		</div>
	)
}

export default HomePage
