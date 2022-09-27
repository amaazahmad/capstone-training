//react imports
import { useEffect, useState } from "react"

// third party packes
import { DocumentData } from "firebase/firestore"

//components
import BlogListEntry from "../blogListEntry/blogListEntry"

type BlogListProps = {
	blogs: DocumentData[] | null
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
					return <BlogListEntry key={blog.title} blog={blog} />
				})
			) : (
				<p className="pl-8 pt-8 text-xl font-normal font-lexend-deca box-border">{pageState}</p>
			)}
		</div>
	)
}
export default BlogList
