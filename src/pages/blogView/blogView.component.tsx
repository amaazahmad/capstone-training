import { useContext } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { ThemeContext } from "../../context/theme/theme.context"

const BlogView = () => {
     const { theme } = useContext(ThemeContext);
     const location = useLocation()
     const navigate = useNavigate();
     const { blog } = location.state
     const { title, date, email, content } = blog;
     const dateToDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

     const backButtonClickHandler = () => {
          navigate(-1);
     }

     return (
          <div className={`h-screen w-screen bottom-0 flex flex-col box-border pb-12 pt-12 xl:flex-row xl:pt-16 xl:overflow-scroll ${theme ? " bg-dark-gray-text-color" : ""}`}>
               <div className="h-[11vh] w-full flex flex-col items-start justify-center pl-11 xl:ml-12 xl:h-full xl:justify-start xl:mt-2 xl:w-[15%]">
                    <p className={`font-dm-serif-display font-normal text-2xl -mb-3 ml-4 cursor-pointer ${theme ? " text-white" : " text-dark-gray-text-color"}`} onClick={backButtonClickHandler}>Back</p>
                    <img className="w-16 cursor-pointer " src='/assets/icons/left-arrow.svg' alt="" onClick={backButtonClickHandler}></img>
               </div>
               <div className={`w-full pl-11 pr-11 flex flex-col items-start mt-2 pb-4 xl:p-0 xl:mt-0 xl:mb-10 xl:h-full xl:w-[70%] ${theme ? " bg-dark-gray-text-color" : ""}`}>

                    <h1 className="font-dm-serif-display font-normal text-3xl leading-[44px] text-green-text-color text-left mb-2 xl:text-[40px] xl:leading-[55px]">{title}</h1>

                    <p className=" font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`written by ${email}`}</p>
                    <p className="font-lexend-deca font-[200] text-base leading-7 text-secondary-text-color xl:text-xl xl:leading-6">{`on ${dateToDisplay}`}</p>
                    <p className={`w-full font-lexend-deca font-normal text-xl leading-8 text-left mt-10 first-letter:text-[64px] xl:text-2xl xl:leading-9 ${theme ? "text-white" : " text-dark-gray-text-color"}`}>{content}</p>
               </div>
               <div className="hidden xl:flex xl:mr-[52px] xl:h-full xl:min-w-[15%]"></div>


          </div>)
}

export default BlogView