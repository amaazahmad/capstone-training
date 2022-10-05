//react imports
import React, { useEffect, useState, useRef, useContext } from "react"

//third party packes
import { useOutletContext } from "react-router-dom"
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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

     useEffect(() => {
          const getBlogsAtHomePage = async () => {
               const blogsRec = await getBlogs(email)
               blogsRec.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })
               setBlogs(blogsRec)
               setFilteredBlogs(blogsRec)
          }

          getBlogsAtHomePage()
     }, [email])

     const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          const searchField = event.target.value.toLowerCase()
          const filteredBlogs = blogs ? blogs.filter((blog) => { return blog.title.toLowerCase().includes(searchField) }) : blogs
          setFilteredBlogs(filteredBlogs);
     }

     const outsideClickHandler = (event: any) => {
          if (event.target !== refSearchBar.current && searchBarVisible && !refSearchBar.current?.value) {
               setSearchBarVisible(false)
          }
     }

     const themeChangeHandler = () => {
          localStorage.setItem('theme', !theme ? "dark" : "light")
          setTheme((!theme))
     }

     const clearSearchClickHandler = () => {
          if (refSearchBar.current?.value)
               refSearchBar.current.value = "";
          setFilteredBlogs(blogs);
     }

     return (
          <div className={`${theme ? "bg-dark-gray-text-color" : ""} mt-16 md:mt-24 flex flex-col justify-center  ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl`} onClickCapture={outsideClickHandler}>
               <img className="w-5 ml-4 md:ml-8" src="/assets/icons/rectangle.svg" alt=""></img>
               <div className="flex flex-row w-full justify-between pr-4 pl-4 md:pr-8 md:pl-8">
                    <h1 className={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca font-normal text-xl leading-6 `}>My Blogs</h1>
                    {screenWidth >= 768 ?
                         <div>
                              <input
                                   type='search'
                                   ref={refSearchBar}
                                   className={`${searchBarVisible ? "mt-[40px] w-96 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-2 outline-none font-lexend-deca" : "w-0 duration-500"}`}
                                   onChange={searchChangeHandler}
                              >

                              </input>
                              <FontAwesomeIcon onClick={clearSearchClickHandler} className={`${searchBarVisible ? "-ml-5 text-secondary-text-color" : "hidden"}`} icon={faXmark} />
                         </div>
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
                         <div>
                              <input
                                   type='search'
                                   ref={refSearchBar}
                                   className={`${searchBarVisible ? "mt-[40px] w-64 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-2 outline-none font-lexend-deca" : "w-0 duration-500"}`}
                                   onChange={searchChangeHandler}
                              >

                              </input>
                              <FontAwesomeIcon className={`${searchBarVisible ? "-ml-5 text-secondary-text-color" : "hidden"}`} icon={faXmark} />
                         </div>
                         :
                         <></>
                    }
               </div>
               <BlogList blogs={filteredBlogs} isMyBlogs={true} />
          </div>
     )
}

export default MyBlogs
