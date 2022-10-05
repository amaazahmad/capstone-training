import Form from "../form/form.component"
import { FieldValues } from "react-hook-form"

import { BlogData } from '../../types/blog/blog'
import { useContext } from "react"
import { ThemeContext } from "../../context/theme/theme.context"

type EditBlogProps = {
     blog?: BlogData
}

const EditBlog = ({ blog }: EditBlogProps) => {

     const { theme } = useContext(ThemeContext)

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
               styles: `${theme ? "text-white bg-dark-gray-text-color border-green-text-color" : "bg-white text-gray-900 border-secondary-text-color focus:border-green-text-color"} box-border w-full not-italic  outline-none leading-5 text-base m-0 p-4 border-2 border-solid  font-lexend-deca  placeholder-secondary-text-color
               sm:self-start sm:ml-0 sm:text-sm  lg:text-lg `
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
               styles: `${theme ? "text-white bg-dark-gray-text-color border-green-text-color" : "bg-white text-gray-900 border-secondary-text-color focus:border-green-text-color"} box-border w-full not-italic  outline-none leading-5 text-base m-0 p-4 border-2 border-solid  font-lexend-deca  placeholder-secondary-text-color
               h-[75%]
               sm:self-start sm:ml-0 sm:text-sm  lg:text-lg `
          },
     ]

     const onSubmitHandler = async (data: FieldValues) => {
          console.log(data)
     }

     return (
          <div className={`${theme ? "bg-dark-gray-text-color" : "bg-white"} border-solid border-4 border-green-text-color pl-2 pr-2 pt-6 pb-6 font-lexend-deca flex flex-col items-center justify-center h-[100%] sm:p-8`}>
               <Form
                    fields={EditBlogFields}
                    buttonText="Submit"
                    onSubmitHandler={onSubmitHandler}
               ></Form>
          </div>
     )
}

export default EditBlog