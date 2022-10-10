import { useContext, useEffect, useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import { Bars } from 'react-loader-spinner'

import { ThemeContext } from "../../context/theme/theme.context"

import { BlogData } from "../../types/blog/blog"

import { getBlogByID } from "../../utils/firebase/firebaseDB.utils"

const BlogView = () => {
     const { isDarkTheme } = useContext(ThemeContext);
     const location = useLocation()
     const navigate = useNavigate();

     const [currentBlog, setCurrentBlog] = useState<BlogData>({ title: "", key: "", content: "", email: "", date: new Date(0) })
     const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);


     const backButtonClickHandler = () => {
          navigate(-1);
     }

     const getBlogData = async () => {
          setIsLoaderVisible(true);
          if (location.state) {
               const { key, title, date, email, content }: { key: string, title: string, date: Date, email: string, content: string } = location.state.blog;
               setCurrentBlog({ key: key, title: title, date: date, content: content, email: email })
          } else {
               let ID = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
               const blog = await getBlogByID(ID)
               if (blog) {
                    setCurrentBlog({ key: ID, title: blog?.title, date: blog?.date.toDate(), content: blog?.content, email: blog?.email })
               }
               else {
                    alert("Failed to fetch blog.")
                    setCurrentBlog({ ...currentBlog, title: "Failed to fetch blog." })
               }
          }
          setIsLoaderVisible(false);
     }

     useEffect(() => {
          getBlogData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [location.state, location.pathname])

     return (

          <div className={`h-screen w-screen bottom-0 flex flex-col box-border pb-12 pt-16 xl:flex-row xl:pt-16 xl:overflow-scroll ${isDarkTheme ? " bg-dark-gray-text-color" : ""}`}>
               <div className="h-[11vh] w-full flex flex-col items-start justify-center pl-9 md:pl-12 xl:ml-12 xl:h-full xl:justify-start xl:mt-2 xl:w-[15%]">
                    <p className={`font-dm-serif-display font-normal text-2xl -mb-3 ml-4 cursor-pointer ${isDarkTheme ? " text-white" : " text-dark-gray-text-color"}`} onClick={backButtonClickHandler}>Back</p>
                    <img className="w-16 cursor-pointer " src='/assets/icons/leftArrow.svg' alt="" onClick={backButtonClickHandler} />
               </div>

               <div className={`w-full pl-9 pr-9 flex flex-col items-start mt-2 pb-4 md:pl-12 md:pr-12 xl:p-0 xl:mt-0 xl:mb-10 xl:h-full xl:w-[90%] ${isDarkTheme ? " bg-dark-gray-text-color" : ""}`}>
                    {isLoaderVisible ?
                         <Bars visible={isLoaderVisible} height="100" width="100" color="rgba(86, 204, 106, 1)" wrapperStyle={{ alignSelf: 'center', justifySelf: 'center', paddingTop: "200px" }} />
                         :
                         <> <h1 className="font-dm-serif-display font-normal text-3xl leading-[44px] text-green-text-color text-left mb-2 xl:text-[40px] xl:leading-[55px]">{currentBlog.title}</h1>

                              <p className=" font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`written by ${currentBlog.email}`}</p>
                              <p className="font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`on ${currentBlog.date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`}</p>
                              <p className={` whitespace-pre-wrap w-full font-lexend-deca font-normal text-xl leading-[22px] text-left mt-10 first-letter:text-[64px] md:leading-[27px] xl:text-2xl xl:leading-[27px] ${isDarkTheme ? "text-white" : " text-dark-gray-text-color"}`}>{currentBlog.content}</p></>
                    }
               </div>
               <div className="hidden xl:flex xl:mr-[52px] xl:h-full xl:min-w-[15%]"></div>
          </div>)
}

export default BlogView