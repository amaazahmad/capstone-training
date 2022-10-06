//react imports
import { useContext, useEffect, useState } from "react"

//components
import BlogListEntry from "../blogListEntry/blogListEntry"

//types
import { BlogData } from '../../types/blog/blog'

//contexts
import { ThemeContext } from "../../context/theme/theme.context"

type BlogListProps = {
	blogs: BlogData[] | null,
	isMyBlogs: boolean
}

const BlogList = ({ blogs, isMyBlogs }: BlogListProps) => {
	const [pageState, setPageState] = useState<string | null>(null)
	const { theme } = useContext(ThemeContext)

	useEffect(() => {
		if (pageState === null) {
			setPageState("loading")
		} else {
			if (blogs?.length) setPageState("loading")
			else setPageState("No blogs found.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogs?.length])

	return (
		<>
			{blogs?.length || pageState === 'loading' ? (
				<div className="mb-5 mt-8">
					{blogs?.map((blog) => {
						return <BlogListEntry key={blog.key} blog={blog} isMyBlog={isMyBlogs} />
					})}
				</div>
			) : (
				<div className="w-full flex justify-center items-center m-0">
					<p className={`${theme ? "text-white" : "text-dark-gray-text-color"} pl-8 pt-8 text-xl font-normal font-lexend-deca box-border`}>{pageState}</p>
				</div>
			)}
		</>
	)
}
export default BlogList
