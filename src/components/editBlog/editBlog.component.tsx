import Form from "../form/form.component"
import { FieldValues } from "react-hook-form"

import { BlogData } from '../../types/blog/blog'

type EditBlogProps = {
     blog?: BlogData
}

const EditBlog = ({ blog }: EditBlogProps) => {

     const EditBlogFields = [
          {
               name: "title",
               type: "text",
               required: "Title is required.",
               minLength: {
                    value: 1,
                    message: 'Title can not be empty.'
               },
               defaultValue: blog?.title
          },
          {
               name: "content",
               type: "textarea",
               required: "Content is required",
               minLength: {
                    value: 1,
                    message: "Blog content can not be empty.",
               },
               defaultValue: blog?.content
          },
     ]

     const onSubmitHandler = async (data: FieldValues) => {
          console.log(data)
     }

     return (
          <div>
               <Form
                    fields={EditBlogFields}
                    buttonText="Submit"
                    onSubmitHandler={onSubmitHandler}
               ></Form>
          </div>
     )
}

export default EditBlog