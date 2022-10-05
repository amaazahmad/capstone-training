//react imports
import { useEffect, useState, useContext } from 'react';

//third party packes
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//local components
import DeleteConfirmation from '../deleteConfirmation/deleteConfirmation.component';
import EditBlog from '../editBlog/editBlog.component';

//contexts
import { ThemeContext } from '../../context/theme/theme.context'

//types
import { BlogData } from '../../types/blog/blog'

type BlogListEntryProps = {
	blog: BlogData,
	isMyBlog: boolean
}

const BlogListEntry = ({ blog, isMyBlog }: BlogListEntryProps) => {

	const { title, email, content, date } = blog;
	const dateToDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric' }).toUpperCase();
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
	const { theme } = useContext(ThemeContext)
	const [deletePopup, setDeletePopup] = useState<boolean>(false);
	const [editPopup, setEditPopup] = useState<boolean>(false);

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', updateScreenSize);
		return (() => { window.removeEventListener('resize', updateScreenSize) })
	})

	return (
		<div className="box-border flex flex-col text-left pb-8 pl-4 pr-4 md:pl-8 md:pr-8 ">
			{screenWidth >= 768 ?
				<p className={`${theme ? "text-white" : "text-dark-gray-text-color"}  font-lexend-deca not-italic font-semibold text-[24px] leading-8 `}>
					{dateToDisplay}
				</p>
				:
				<></>
			}
			<div className="w-full flex flex-row justify-between">
				<Link to={`/blog/${blog.key}`} state={{ blog }} style={{ width: '100%' }}>
					<h1 className=" w-4/5 font-dm-serif-display not-italic font-normal text-2xl text-green-text-color mb-[10px] mt-0 cursor-pointer
						md:text-[32px] md:leading-[44px] xl:mt-[10px] xl:mb-4">{title}</h1>
				</Link>
				{isMyBlog && <div className='w-1/5 flex flex-row pt-2 justify-end'>
					<Popup
						defaultOpen={editPopup}
						open={editPopup}
						onOpen={() => { setEditPopup(true) }}
						onClose={() => { setEditPopup(false) }}
						contentStyle={screenWidth >= 768 ? { padding: 0, border: 0, width: '55%', height: '70%' } : { padding: 0, border: 0, width: '75%', height: '70%' }}
						modal
						closeOnDocumentClick
						repositionOnResize
						trigger={<img className='w-5 h-5 mr-4 md:w-6 md:h-6' src="/assets/icons/editIcon.png" alt="" />}
					>
						<EditBlog blog={blog} setEditPopup={setEditPopup} />
					</Popup>

					<Popup
						defaultOpen={deletePopup}
						open={deletePopup}
						onOpen={() => { setDeletePopup(true) }}
						onClose={() => { setDeletePopup(false) }}
						contentStyle={screenWidth >= 768 ? { padding: 0, border: 0 } : { padding: 0, border: 0, width: '85%' }}
						modal
						closeOnDocumentClick
						repositionOnResize
						trigger={<img className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' src="/assets/icons/redDeleteIcon.png" alt="" />}
					>
						<DeleteConfirmation setDeletePopup={setDeletePopup} blogID={blog.key} />
					</Popup>


				</div>}

			</div>
			<TextTruncate
				containerClassName={`${theme ? "text-white" : "text-dark-gray-text-color"} whitespace-pre-wrap font-lexend-deca not-italic font-normal text-[16px] leading-[20px] mb-[11px] mt-0 
				md:text-[20px] md:leading-[25px]`}
				line={screenWidth < 768 ? 9 : 5} element="p" truncateText='' text={content}
				textTruncateChild={
					<Link className='font-lexend-deca not-italic font-normal text-base leading-5 text-green-text-color cursor-pointer md:text-xl md:leading-6'
						to={`/blog/${blog.key}`} state={{ blog }}>...read more
					</Link>}
			></TextTruncate>
			<div className=' flex flex-row justify-between '>
				{screenWidth < 768 ?
					<p className={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca not-italic font-semibold text-[16px] leading-5 `}>
						{dateToDisplay}
					</p>
					:
					<></>}
				<p className="font-lexend-deca not-italic font-light text-base leading-5 text-secondary-text-color">{email}</p>
			</div>
		</div>
	)
}

export default BlogListEntry
