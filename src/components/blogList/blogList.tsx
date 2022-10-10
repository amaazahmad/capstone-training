import { useContext, useEffect, useState } from "react"

import BlogListEntry from "../blogListEntry/blogListEntry"

import { BlogData } from '../../types/blog/blog'

import { ThemeContext } from "../../context/theme/theme.context"

type BlogListProps = {
	blogs: BlogData[] | null,
	isMyBlogs: boolean,
	setRefreshAfterDeletion?: (refresh: boolean) => void
}

const BlogList = ({ blogs, isMyBlogs, setRefreshAfterDeletion }: BlogListProps) => {
	const [pageState, setPageState] = useState<string>("")
	const { theme } = useContext(ThemeContext)

	useEffect(() => {
		if (blogs?.length === 0) setPageState("No blogs found.")
		else setPageState("")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogs?.length])

	return (
		<>
			{blogs?.length ? (
				<div className="mb-5 mt-8">
					{blogs?.map((blog) => {
						return <BlogListEntry key={blog.key} blog={blog} isMyBlog={isMyBlogs} setRefreshAfterDeletion={setRefreshAfterDeletion} />
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
