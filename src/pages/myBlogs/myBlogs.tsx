//react imports
import { useEffect, useState, useContext } from "react"

//third party
import Switch from "react-switch";

//contexts
import { UserContext } from "../../context/user/user.context"
import { ThemeContext } from "../../context/theme/theme.context"

//components
import BlogList from "../../components/blogList/blogList"

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"


const MyBlogs = () => {
     type BlogData = {
          key: string,
          title: string,
          email: string,
          content: string,
          date: Date
     }

     const [blogs, setBlogs] = useState<BlogData[] | null>(null)

     const { theme, setTheme } = useContext(ThemeContext);
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

     const themeChangeHandler = () => {
          localStorage.setItem('theme', !theme ? "dark" : "light")
          setTheme((!theme))
     }

     return (

          <div className={`${theme ? "bg-dark-gray-text-color" : ""} mt-24 flex flex-col justify-center  ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl`} >
               <img className="w-5 ml-8 " src="/assets/icons/rectangle.svg" alt=""></img>
               <div className="headingAndToggleContainer">
                    <h1 className={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca font-normal text-xl leading-6  md:ml-8`}>My Blogs</h1>
                    <Switch
                         checkedIcon={<img src="/assets/icons/sun.png" style={{ width: '24px', paddingTop: "4px", paddingLeft: '3px' }} alt="" />}
                         uncheckedIcon={<img src="/assets/icons/moon.png" alt="" style={{ width: '24px', paddingTop: '4px', paddingLeft: '4px' }} />}
                         checked={theme} onChange={themeChangeHandler}>
                    </Switch>
               </div>
               <BlogList blogs={blogs} />
          </div>
     )
}

export default MyBlogs
