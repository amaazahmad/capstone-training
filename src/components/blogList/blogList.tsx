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
			setPageState("Loading articles. Hold on.")
		} else {
			if (blogs?.length) setPageState("Loading articles. Hold on.")
			else setPageState("No blogs found.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogs?.length])

	return (
		<div className="mb-5 mt-2 md:mt-8">
			{blogs?.length ? (
				blogs?.map((blog) => {
					return <BlogListEntry key={blog.key} blog={blog} isMyBlog={isMyBlogs} />
				})
			) : (
				<p className={`${theme ? "text-white" : "text-dark-gray-color"} pl-8 pt-8 text-xl font-normal font-lexend-deca box-border`}>{pageState}</p>
			)}
		</div>
	)
}
export default BlogList
