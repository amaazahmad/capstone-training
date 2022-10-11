import { useContext } from 'react';
import { useNavigate } from "react-router-dom"

import { ThemeContext } from '../../context/theme/theme.context';

import { signOutUser } from "../../utils/firebase/firebase.utils"

type SignoutWarningProps = {
     setSignoutWarning: (isOpen: boolean) => void;
}

const SignoutWarning = ({ setSignoutWarning }: SignoutWarningProps) => {

     const { isDarkTheme } = useContext(ThemeContext);
     const navigate = useNavigate();

     const signOutHandler = () => {
          const response = signOutUser()
          if (!(response instanceof Error)) navigate("/login")
     }

     return (
          <div className={`${isDarkTheme ? "bg-dark-gray-text-color" : "bg-white"} border-solid border-4 border-green-text-color pl-0 pr-0 pt-6 pb-6 font-lexend-deca flex flex-col items-center justify-center h-[100%] sm:p-8`}>
               <h1 className={`${isDarkTheme ? "text-white" : "text-dark-gray-text-color"} text-center p-3 mt-2 text-xl md:mt-4 md:text-4xl`}>Are you sure you want to sign out?</h1>
               <div className=' flex justify-evenly mt-6 flex-row w-full'>
                    <button onClick={() => { setSignoutWarning(false) }} className=' h-14 w-20 md:w-32 m-2  text-white outline-none bg-secondary-text-color rounded-xl text-l md:text-xl' >Cancel</button>
                    <button onClick={signOutHandler} className=' h-14 w-20 md:w-32 m-2 text-white outline-none bg-red-600 rounded-xl text-l md:text-xl'>Signout</button>
               </div>
          </div>
     )
}
export default SignoutWarning