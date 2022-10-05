//react imports
import { useEffect, useState, useContext } from "react"

//components
import BlogListEntry from "../blogListEntry/blogListEntry"

//contexts
import { ThemeContext } from '../../context/theme/theme.context'

//types
import { BlogData } from '../../types/blog/blog'

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
		<div className="mb-5 mt-2 md:mt-8">
			{
				blogs?.map((blog) => {
					return <BlogListEntry key={blog.key} blog={blog} isMyBlog={isMyBlogs} />
				})
			}
		</div>
	)
}
export default BlogList
