import { useContext } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { ThemeContext } from "../../context/theme/theme.context"

import './blogView.css'

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
          <div className={`fullContainer ${theme ? " bg-dark-gray-text-color" : ""}`}>
               <div className="backButtonContainer">
                    <p className={`backText ${theme ? " text-white" : " text-dark-gray-text-color"}`} onClick={backButtonClickHandler}>Back</p>
                    <img className="backArrow" src='/assets/icons/left-arrow.svg' alt="" onClick={backButtonClickHandler}></img>
               </div>
               <div className={`${theme ? " bg-dark-gray-text-color" : ""} contentContainer`}>
                    <div className="titleAndButtonsContainer">
                         <h1 className="title">{title}</h1>
                    </div>
                    <p className="dateEmail">{`written by ${email}`}</p>
                    <p className="dateEmail">{`on ${dateToDisplay}`}</p>
                    <p className={`content ${theme ? "text-white" : " text-dark-gray-text-color"}`}>{content}</p>
               </div>
               <div className="rightContainer"></div>


          </div>)
}

export default BlogView