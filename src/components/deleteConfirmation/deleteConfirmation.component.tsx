//firebase utils
import { deleteBlog } from '../../utils/firebase/firebaseDB.utils'

type DeleteConfirmationProps = {
     blogID: string;
     setDeletePopup: (isOpen: boolean) => void;
}

const DeleteConfirmation = ({ blogID, setDeletePopup }: DeleteConfirmationProps) => {

     const handleDelete = async (id: string) => {
          deleteBlog(id);
          setDeletePopup(false);
     }

     return (
          <div className=" border-solid border-4 border-green-text-color p-8 font-lexend-deca flex flex-col items-center">
               <img className='w-28' src="/assets/icons/warning.png" alt="" />
               <h1 className='mt-4 text-4xl text-dark-gray-text-color'>Are you sure?</h1>
               <p className='mt-2 text-l text-secondary-text-color'>This process can not be undone.</p>
               <div className='mt-6'>
                    <button onClick={() => { setDeletePopup(false) }} className='p-4 m-2 text-white outline-none bg-secondary-text-color rounded-xl' >Cancel</button>
                    <button onClick={() => { handleDelete(blogID) }} className='p-4 m-2 text-white outline-none bg-red-600 rounded-xl'>Delete</button>
               </div>
          </div>
     )
}

export default DeleteConfirmation