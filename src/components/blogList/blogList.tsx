//react imports
import { useEffect, useState } from "react"

//components
import BlogListEntry from "../blogListEntry/blogListEntry"

type BlogData = {
	key: string,
	title: string,
	email: string,
	content: string,
	date: Date
}

type BlogListProps = {
	blogs: BlogData[] | null
}


const BlogList = ({ blogs }: BlogListProps) => {
	const [pageState, setPageState] = useState<string | null>(null)

	useEffect(() => {
		if (pageState === null) {
			setPageState("Loading articles. Hold on.")
		} else {
			if (blogs?.length) setPageState(null)
			else setPageState("No blogs found.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogs?.length])

	return (
		<div className="mb-5">
			{blogs?.length ? (
				blogs?.map((blog) => {
					return <BlogListEntry key={blog.key} blog={blog} />
				})
			) : (
				<p className="pl-8 pt-8 text-xl font-normal font-lexend-deca box-border">{pageState}</p>
			)}
		</div>
	)
}
export default BlogList
