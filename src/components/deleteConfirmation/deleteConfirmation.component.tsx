import { useContext, useState } from 'react';

import { Bars } from 'react-loader-spinner'

import { ThemeContext } from '../../context/theme/theme.context';

//firebase utils
import { deleteBlog } from '../../utils/firebase/firebaseDB.utils'

type DeleteConfirmationProps = {
     blogID: string;
     setDeletePopup: (isOpen: boolean) => void;
}

const DeleteConfirmation = ({ blogID, setDeletePopup }: DeleteConfirmationProps) => {

     const { theme } = useContext(ThemeContext);
     const [loaderVisible, setLoaderVisible] = useState<boolean>(false);

     const handleDelete = async (id: string) => {
          setLoaderVisible(true)
          await deleteBlog(id);
          setDeletePopup(false);
          window.location.reload();
     }

     return (
          <div className={`${theme ? " bg-dark-gray-text-color" : "bg-white"} border-solid border-4 border-green-text-color p-8 font-lexend-deca flex flex-col items-center`}>
               <img className='w-20 md:w-28' src="/assets/icons/warning.png" alt="" />
               <h1 className={`${theme ? "text-white" : "text-dark-gray-text-color"} text-center mt-2 text-xl md:mt-4 md:text-4xl`}>Are you sure?</h1>
               <p className=' text-center mt-1 text-m md:mt-2 md:text-l text-secondary-text-color'>This process can not be undone.</p>
               <div className=' flex flex-col-reverse justify-center mt-6 sm:flex-row'>
                    <button onClick={() => { setDeletePopup(false) }} className='pb-4 pt-4 h-14 w-24 m-2 text-white outline-none bg-secondary-text-color rounded-xl' >Cancel</button>
                    <button onClick={() => { handleDelete(blogID) }} className='pb-4 pt-4 h-14 w-24 m-2 text-white outline-none bg-red-600 rounded-xl'>{loaderVisible ? <Bars visible={true} height="26" width="30" color="white" wrapperStyle={{ justifyContent: 'center' }} /> : "Delete"}</button>
               </div>
          </div>
     )
}

export default DeleteConfirmation