import { useLocation, useNavigate } from "react-router-dom"

import './blogView.css'

const BlogView = () => {
     const location = useLocation()
     const navigate = useNavigate();
     const { blog } = location.state
     const { title, date, email, content } = blog;
     const dateToDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

     const backButtonClickHandler = () => {
          navigate(-1);
     }

     return (
          <div className="fullContainer">
               <div className="backButtonContainer">
                    <p className="backText" onClick={backButtonClickHandler}>Back</p>
                    <img className="backArrow" src='/assets/icons/left-arrow.svg' alt="" onClick={backButtonClickHandler}></img>
               </div>
               <div className="contentContainer">
                    <div className="titleAndButtonsContainer">
                         <h1 className="title">{title}</h1>
                    </div>
                    <p className="dateEmail">{`written by ${email}`}</p>
                    <p className="dateEmail">{`on ${dateToDisplay}`}</p>
                    <p className="content">{content}</p>
               </div>
               <div className="rightContainer"></div>


          </div>)
}

export default BlogView