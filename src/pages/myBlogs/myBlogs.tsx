import React, { useEffect, useState, useRef, useContext } from "react"

import { useOutletContext } from "react-router-dom"
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Bars } from 'react-loader-spinner'

import BlogList from "../../components/blogList/blogList"

import { BlogData } from '../../types/blog/blog'

import { ThemeContext } from "../../context/theme/theme.context"
import { UserContext } from "../../context/user/user.context";

import { getBlogs } from "../../utils/firebase/firebaseDB.utils"


const MyBlogs = () => {
     const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
     const [blogs, setBlogs] = useState<BlogData[] | null>(null)
     const [filteredBlogs, setFilteredBlogs] = useState<BlogData[] | null>(null);
     const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);
     const [refreshAfterDeletion, setRefreshAfterDeletion] = useState<boolean>(false);
     const refSearchBar = useRef<HTMLInputElement>(null);
     const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
     const email = useContext(UserContext)?.currentUser?.email;


     type OutletContextType = [
          isSearchBarVisible: boolean,
          setIsSearchBarVisible: (visible: boolean) => {}
     ]
     const [isSearchBarVisible, setIsSearchBarVisible] = useOutletContext<OutletContextType>()

     const updateScreenSize = () => {
          setScreenWidth(window.innerWidth);
     }

     useEffect(() => {
          window.addEventListener('resize', updateScreenSize);
          return (() => { window.removeEventListener('resize', updateScreenSize) })
     })

     useEffect(() => {
          setBlogs(null);
          setFilteredBlogs(null);
          const getBlogsAtHomePage = async () => {
               setIsLoaderVisible(true)
               const blogsRec = await getBlogs(email)
               blogsRec.sort((objA, objB) => { return Number(objB.date) - Number(objA.date) })
               setBlogs(blogsRec)
               setFilteredBlogs(blogsRec)
               setIsLoaderVisible(false)
          }
          setRefreshAfterDeletion(false)
          getBlogsAtHomePage()
     }, [email, refreshAfterDeletion])

     const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          const searchField = event.target.value.toLowerCase()
          const filteredBlogs = blogs ? blogs.filter((blog) => { return blog.title.toLowerCase().includes(searchField) }) : blogs
          setFilteredBlogs(filteredBlogs);
     }

     const outsideClickHandler = (event: any) => {
          if (event.target !== refSearchBar.current && isSearchBarVisible && !refSearchBar.current?.value) {
               setIsSearchBarVisible(false)
          }
     }

     const themeChangeHandler = () => {
          localStorage.setItem('theme', !isDarkTheme ? "dark" : "light")
          setIsDarkTheme((!isDarkTheme))
     }

     const clearSearchClickHandler = () => {
          if (refSearchBar.current?.value)
               refSearchBar.current.value = "";
          setFilteredBlogs(blogs);
     }

     return (
          <div className={`${isDarkTheme ? "bg-dark-gray-text-color" : ""} mt-16 md:mt-24 flex flex-col justify-center  ml-4 mr-4 md:items-start xl:ml-16 xl:max-w-screen-2xl`} onClickCapture={outsideClickHandler}>
               <img className="w-5 ml-4 md:ml-8" src="/assets/icons/rectangle.svg" alt=""></img>
               <div className="flex flex-row w-full justify-between pr-4 pl-4 md:pr-8 md:pl-8">
                    <h1 className={`${isDarkTheme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca font-normal text-xl leading-6 `}>My Blogs</h1>
                    {screenWidth >= 768 ?
                         <div>
                              <input
                                   type='search'
                                   ref={refSearchBar}
                                   className={`${isSearchBarVisible ? "mt-[40px] w-96 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-2 outline-none font-lexend-deca" : "w-0 duration-500"}`}
                                   onChange={searchChangeHandler}
                              />
                              <FontAwesomeIcon onClick={clearSearchClickHandler} className={`${isSearchBarVisible ? "-ml-5 text-secondary-text-color" : "hidden"}`} icon={faXmark} />
                         </div>
                         :
                         null
                    }
                    <Switch
                         checkedIcon={<img src="/assets/icons/sun.png" alt="" className="w-6 pt-1 pl-1" />}
                         uncheckedIcon={<img src="/assets/icons/moon.png" alt="" className="w-6 pt-1 pl-1" />}
                         checked={isDarkTheme} onChange={themeChangeHandler}
                    />
               </div>
               <div>
                    {screenWidth < 768 ?
                         <div>
                              <input
                                   type='search'
                                   ref={refSearchBar}
                                   className={`${isSearchBarVisible ? "mt-[40px] w-64 duration-500 border-solid border-green-text-color border-2 border-r rounded-[50px] pl-2  pr-2 outline-none font-lexend-deca" : "w-0 duration-500"}`}
                                   onChange={searchChangeHandler}
                              />
                              <FontAwesomeIcon onClick={clearSearchClickHandler} className={`${isSearchBarVisible ? "-ml-5 text-secondary-text-color" : "hidden"}`} icon={faXmark} />
                         </div>
                         :
                         null
                    }
               </div>
               <Bars visible={isLoaderVisible} height="100" width="100" color="rgba(86, 204, 106, 1)" wrapperStyle={{ alignSelf: 'center', marginTop: '120px' }} />
               <BlogList blogs={filteredBlogs} isMyBlogs={true} setRefreshAfterDeletion={setRefreshAfterDeletion} />
          </div>
     )
}

export default MyBlogs
