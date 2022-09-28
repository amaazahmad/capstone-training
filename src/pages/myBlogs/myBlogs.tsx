//react imports
import { useEffect, useState, useContext } from "react"

//contexts
import { UserContext } from "../../context/user.context"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"

//import "./home.styles.css"

const MyBlogs = () => {
     type BlogData = {
          key: string,
          title: string,
          email: string,
          content: string,
          date: Date
     }

     const [blogs, setBlogs] = useState<BlogData[] | null>(null)

     const user = useContext(UserContext);
     const email = user?.currentUser?.email;

     useEffect(() => {

          const getBlogsList = async () => {
               const blogs = await getBlogs(email)
               blogs.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })

               setBlogs(blogs)
          }

          getBlogsList()
     }, [email])

     return (
          <div className=" mt-24 flex flex-col justify-center items-center ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl">
               <img className="w-5 md:ml-8" src="/assets/icons/rectangle.svg" alt=""></img>
               <h1 className="font-lexend-deca font-normal text-xl leading-6 text-dark-gray-text-color md:ml-8">My Blogs</h1>
               <BlogList blogs={blogs} />
          </div>
     )
}

export default MyBlogs
