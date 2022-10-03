//react imports
import React, { useEffect, useState, useRef, useContext } from "react"

//third party packes
import { useOutletContext } from "react-router-dom"
import Switch from "react-switch";

//components
import BlogList from "../../components/blogList/blogList"

//contexts
import { ThemeContext } from "../../context/theme/theme.context"
import { UserContext } from "../../context/user/user.context";

//utils
import { getBlogs } from "../../utils/firebase/firebaseDB.utils"

//types
import { BlogData } from '../../types/blog/blog'

const MyBlogs = () => {


     const { theme, setTheme } = useContext(ThemeContext);
     const [blogs, setBlogs] = useState<BlogData[] | null>(null)
     const [filteredBlogs, setFilteredBlogs] = useState<BlogData[] | null>(null);
     const refSearchBar = useRef<HTMLInputElement>(null);
     const user = useContext(UserContext);
     const email = user?.currentUser?.email;


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
               const blogsRec = await getBlogs(email)
               blogsRec.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })
               setBlogs(blogsRec)
               setFilteredBlogs(blogsRec)
          }

          getBlogsAtHomePage()
     })

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
               <img className="w-5 ml-8 " src="/assets/icons/rectangle.svg" alt=""></img>
               <div className="headingAndToggleContainer">
                    <h1 className={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca font-normal text-xl leading-6  md:ml-8`}>My Blogs</h1>
                    {screenWidth >= 768 ? <input ref={refSearchBar} className={searchBarVisible ? "inputBarActive" : "inputBar"} onChange={searchChangeHandler} /> : <></>}
                    <Switch
                         checkedIcon={<img src="/assets/icons/sun.png" style={{ width: '24px', paddingTop: "4px", paddingLeft: '3px' }} alt="" />}
                         uncheckedIcon={<img src="/assets/icons/moon.png" alt="" style={{ width: '24px', paddingTop: '4px', paddingLeft: '4px' }} />}
                         checked={theme} onChange={themeChangeHandler}>
                    </Switch>
               </div>
               <div>
                    {screenWidth < 768 ? <input ref={refSearchBar} className={searchBarVisible ? "inputBarActive" : "inputBar"} onChange={searchChangeHandler} /> : <></>}
               </div>
               <BlogList blogs={filteredBlogs} isMyBlogs={true} />
          </div>
     )
}

export default MyBlogs
