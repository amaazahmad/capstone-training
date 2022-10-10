import { useContext } from "react"

import { FieldValues } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"

import Form from "../form/form.component"

import { BlogData } from '../../types/blog/blog'

import { ThemeContext } from "../../context/theme/theme.context"

import { createBlog, updateBlog } from '../../utils/firebase/firebaseDB.utils'

type EditBlogProps = {
     blog?: BlogData;
     setEditPopup: (isOpen: boolean) => void;
}

const EditBlog = ({ blog, setEditPopup }: EditBlogProps) => {

     const { isDarkTheme } = useContext(ThemeContext)
     const navigate = useNavigate();
     const auth = getAuth()

     const EditBlogFields = [
          {
               name: "title",
               type: "text",
               required: "Title is required.",
               minLength: {
                    value: 1,
                    message: 'Title can not be empty.'
               },
               defaultValue: blog?.title,
               styles: `${isDarkTheme ? "text-white bg-dark-gray-text-color border-green-text-color" : "bg-white text-gray-900 border-secondary-text-color focus:border-green-text-color"} 
               border-2 w-[110%]
               sm:w-full
               lg:text-lg lg:max-w-[none]`
          },
          {
               name: "content",
               type: "textarea",
               required: "Content is required",
               minLength: {
                    value: 1,
                    message: "Blog content can not be empty.",
               },
               defaultValue: blog?.content,
               styles: `${isDarkTheme ? "text-white bg-dark-gray-text-color border-green-text-color" : "bg-white text-gray-900 border-secondary-text-color focus:border-green-text-color"} 
               box-border w-full not-italic  outline-none leading-5 text-base m-0 p-4 border-2 border-solid  font-lexend-deca  placeholder-secondary-text-color h-[75%] w-[110%]
               sm:self-start sm:ml-0 sm:text-sm  sm:w-full
               lg:text-lg `
          },
     ]

     const updateExistingBlog = async (key: string, title: string, content: string) => {
          const response = await updateBlog(key, title, content)
          if (response === 'success') {
               navigate(`/blog/${key}`)
          } else {
               alert(`Failed to update blog: ${response}`)
          }
     }

     const createNewBlog = async (title: string, content: string) => {
          const userEmail = auth.currentUser?.email || "";
          const now = new Date();
          const response = await createBlog(title, content, userEmail, now)
          if (response) {
               navigate(`/blog/${response}`)
          } else {
               alert(`Failed to create blog: ${response}`)
          }
     }

     const onSubmitHandler = async ({ title, content }: FieldValues) => {
          if (blog) {
               await updateExistingBlog(blog.key, title, content)
          }
          else {
               await createNewBlog(title, content);
          }
     }


     return (
          <div className={`${isDarkTheme ? "bg-dark-gray-text-color" : "bg-white"} border-solid border-4 border-green-text-color pl-0 pr-0 pt-6 pb-6 font-lexend-deca flex flex-col items-center justify-center h-[100%] sm:p-8`}>
               <Form
                    fields={EditBlogFields}
                    buttonText={blog ? "SAVE" : "ADD"}
                    onSubmitHandler={onSubmitHandler}
                    cancelButton
                    onCancelHandler={() => { setEditPopup(false) }}
               />
          </div>
     )
}

export default EditBlog