import BlogListEntry from "../blogListEntry/blogListEntry"

import { BlogData } from '../../types/blog/blog'


type BlogListProps = {
	blogs: BlogData[] | null,
	isMyBlogs: boolean,
	setRefreshAfterDeletion?: (refresh: boolean) => void
}

const BlogList = ({ blogs, isMyBlogs, setRefreshAfterDeletion }: BlogListProps) => {

	return (
		<div className="mb-5 mt-8 md:w-full">
			{blogs?.map((blog) => {
				return <BlogListEntry key={blog.key} blog={blog} isMyBlog={isMyBlogs} setRefreshAfterDeletion={setRefreshAfterDeletion} />
			})}
		</div>
	)
}
export default BlogList
