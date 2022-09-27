//react imports
import {useEffect, useState, useContext} from "react"

//third party packes
import {DocumentData} from "firebase/firestore"

//contexts
import { UserContext } from "../../context/user.context"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import {getBlogs} from "../../utils/firebase/firebaseDB.utils"

//import "./home.styles.css"

const MyBlogs = () => {

	const [blogs, setBlogs] = useState<DocumentData[] | null>(null)

     const user = useContext(UserContext);
     const email = user?.currentUser?.email;

	useEffect(() => {
		
		const getBlogsAtHomePage = async () => {
			const blogs = await getBlogs(email)
			blogs.sort((objA, objB) => {return Number(objB.date) - Number(objA.date)})
			
			setBlogs(blogs)
		}
          
		getBlogsAtHomePage()
	}, [email])

	return (
		<div className="homepage-container">
			<img className="dash-icon" src="/assets/icons/rectangle.svg" alt=""></img>
			<h1 className="page-heading">My Blogs</h1>
			<BlogList blogs={blogs} />
		</div>
	)
}

export default MyBlogs
