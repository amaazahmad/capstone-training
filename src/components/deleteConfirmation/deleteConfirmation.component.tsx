import { useContext, useState } from 'react';

import { Bars } from 'react-loader-spinner'

import { ThemeContext } from '../../context/theme/theme.context';

import { deleteBlog } from '../../utils/firebase/firebaseDB.utils'

type DeleteConfirmationProps = {
     blogID: string;
     setDeletePopup: (isOpen: boolean) => void;
     setRefreshAfterDeletion?: (refresh: boolean) => void;
}

const DeleteConfirmation = ({ blogID, setDeletePopup, setRefreshAfterDeletion }: DeleteConfirmationProps) => {

     const { isDarkTheme } = useContext(ThemeContext);
     const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);

     const handleDelete = async (id: string) => {
          setIsLoaderVisible(true)
          await deleteBlog(id);
          setDeletePopup(false);
          if (setRefreshAfterDeletion)
               setRefreshAfterDeletion(true);
     }

     return (
          <div className={`${isDarkTheme ? " bg-dark-gray-text-color" : "bg-white"} border-solid border-4 border-green-text-color p-8 font-lexend-deca flex flex-col items-center`}>
               <img className='w-20' src="/assets/icons/warning.png" alt="" />
               <h1 className={`${isDarkTheme ? "text-white" : "text-dark-gray-text-color"} text-center mt-2 text-xl md:mt-4 md:text-4xl`}>Are you sure?</h1>
               <p className=' text-center mt-1 text-l md:mt-2 md:text-xl text-secondary-text-color'>This process can not be undone.</p>
               <div className=' flex justify-evenly mt-6 flex-row w-full'>
                    <button
                         onClick={() => { setDeletePopup(false) }}
                         className=' h-14 w-20 md:w-32 m-2  text-white outline-none bg-secondary-text-color rounded-xl text-l md:text-xl' >
                         Cancel
                    </button>
                    <button
                         onClick={() => { handleDelete(blogID) }}
                         className=' h-14 w-20 md:w-32 m-2 text-white outline-none bg-red-600 rounded-xl text-l md:text-xl'>
                         {isLoaderVisible ?
                              <Bars visible={true} height="26" width="30" color="white" wrapperStyle={{ justifyContent: 'center' }} />
                              :
                              "Delete"
                         }
                    </button>
               </div>
          </div>
     )
}

export default DeleteConfirmation