//react imports
import { useEffect, useState } from "react"

//third party packes
import { DocumentData } from "firebase/firestore"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"


const HomePage = () => {

	const [blogs, setBlogs] = useState<DocumentData[] | null>(null)

	useEffect(() => {

		const getBlogsAtHomePage = async () => {
			const blogs = await getBlogs()
			blogs.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })
			//const blogs: DocumentData[] = []   empty array for testing

			setBlogs(blogs)
		}
		getBlogsAtHomePage()
	}, [])

	return (
		<div className=" mt-24 flex flex-col justify-center items-center ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl">
			<img className="w-5 md:ml-8 " src="/assets/icons/rectangle.svg" alt=""></img>
			<h1 className="font-lexend-deca font-normal text-xl leading-6 text-dark-gray-text-color md:ml-8">Latest</h1>
			<BlogList blogs={blogs} />
		</div>
	)
}

export default HomePage
