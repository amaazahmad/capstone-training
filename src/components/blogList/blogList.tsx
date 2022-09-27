//react imports
import {useEffect, useState} from "react"

// third party packes
import {DocumentData} from "firebase/firestore"

//components
import BlogListEntry from "../blogListEntry/blogListEntry"

type BlogListProps = {
	blogs: DocumentData[] | null
}

const BlogList = ({blogs}: BlogListProps) => {
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
		<div style={{"marginBottom":"20px"}}>
			{blogs?.length ? (
				blogs?.map((blog) => {
					return <BlogListEntry key={blog.title} blog={blog} />
				})
			) : (
				<p style={{fontFamily:'Lexend Deca', paddingLeft:'2rem', paddingTop:'2rem', fontSize:'20px', fontWeight:'400'}}>{pageState}</p>
			)}
		</div>
	)
}
export default BlogList
