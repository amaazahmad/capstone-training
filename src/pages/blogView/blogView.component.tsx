import { useContext, useEffect, useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import { Bars } from 'react-loader-spinner'

import { ThemeContext } from "../../context/theme/theme.context"

import { getBlogByID } from "../../utils/firebase/firebaseDB.utils"

const BlogView = () => {
     const { theme } = useContext(ThemeContext);
     const location = useLocation()
     const navigate = useNavigate();

     const [title, setTitle] = useState<string>("")
     const [content, setContent] = useState<string>("")
     const [email, setEmail] = useState<string>("")
     const [date, setDate] = useState<string>("")
     const [loaderVisible, setLoaderVisible] = useState<boolean>(false);


     const backButtonClickHandler = () => {
          navigate(-1);
     }

     useEffect(() => {
          const getBlogData = async () => {
               setLoaderVisible(true);
               if (location.state) {
                    const { blog } = location.state
                    const { title, date, email, content } = blog;
                    const dateToDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
                    setTitle(title);
                    setDate(dateToDisplay)
                    setEmail(email)
                    setContent(content)
               } else {
                    let ID = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
                    const blog = await getBlogByID(ID)
                    if (blog) {
                         console.log("BLOG FOUND");
                         const dateToDisplay = blog?.date.toDate().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
                         setTitle(blog?.title);
                         setDate(dateToDisplay)
                         setEmail(blog?.email)
                         setContent(blog?.content)
                    }
                    else {
                         alert("Failed to fetch blog.")
                         setTitle("Failed to fetch blog.")
                    }

               }
               setLoaderVisible(false);
          }
          getBlogData();

     }, [location.pathname, location.state])


     return (

          <div className={`h-screen w-screen bottom-0 flex flex-col box-border pb-12 pt-16 xl:flex-row xl:pt-16 xl:overflow-scroll ${theme ? " bg-dark-gray-text-color" : ""}`}>
               <div className="h-[11vh] w-full flex flex-col items-start justify-center pl-9 md:pl-12 xl:ml-12 xl:h-full xl:justify-start xl:mt-2 xl:w-[15%]">
                    <p className={`font-dm-serif-display font-normal text-2xl -mb-3 ml-4 cursor-pointer ${theme ? " text-white" : " text-dark-gray-text-color"}`} onClick={backButtonClickHandler}>Back</p>
                    <img className="w-16 cursor-pointer " src='/assets/icons/left-arrow.svg' alt="" onClick={backButtonClickHandler}></img>
               </div>

               <div className={`w-full pl-9 pr-9 flex flex-col items-start mt-2 pb-4 md:pl-12 md:pr-12 xl:p-0 xl:mt-0 xl:mb-10 xl:h-full xl:w-[90%] ${theme ? " bg-dark-gray-text-color" : ""}`}>
                    {loaderVisible ?
                         <Bars visible={loaderVisible} height="100" width="100" color="rgba(86, 204, 106, 1)" wrapperStyle={{ alignSelf: 'center', justifySelf: 'center', paddingTop: "200px" }} />
                         :
                         <> <h1 className="font-dm-serif-display font-normal text-3xl leading-[44px] text-green-text-color text-left mb-2 xl:text-[40px] xl:leading-[55px]">{title}</h1>

                              <p className=" font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`written by ${email}`}</p>
                              <p className="font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`on ${date}`}</p>
                              <p className={` whitespace-pre-wrap w-full font-lexend-deca font-normal text-xl leading-[22px] text-left mt-10 first-letter:text-[64px] md:leading-[27px] xl:text-2xl xl:leading-[27px] ${theme ? "text-white" : " text-dark-gray-text-color"}`}>{content}</p></>
                    }


               </div>


               <div className="hidden xl:flex xl:mr-[52px] xl:h-full xl:min-w-[15%]"></div>


          </div>)
}

export default BlogView