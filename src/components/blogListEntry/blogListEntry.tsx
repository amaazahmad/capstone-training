//react imports
import { useEffect, useState, useContext } from 'react';

//third party packes
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

//contexts
import { ThemeContext } from '../../context/theme/theme.context'

type BlogData = {
	key: string,
	title: string,
	email: string,
	content: string,
	date: Date
}

type BlogListEntryProps = {
	blog: BlogData,
	key: string
}

const BlogListEntry = ({ blog }: BlogListEntryProps) => {

	const { title, email, content, date } = blog;
	const dateToDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric' }).toUpperCase();
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
	const { theme } = useContext(ThemeContext)

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', updateScreenSize);
		return (() => { window.removeEventListener('resize', updateScreenSize) })
	})

	return (
		<div className="box-border flex flex-col text-left pl-8 pr-8 pt-8 pb-2">
			{screenWidth >= 768 ?
				<p className={`${theme ? "text-white" : "text-dark-gray-text-color"}  font-lexend-deca not-italic font-semibold text-[24px] leading-8 `}>
					{dateToDisplay}
				</p>
				:
				<></>}
			<Link to={`/blog/${blog.key}`} state={{ blog }}>
				<h1 className="font-dm-serif-display not-italic font-normal text-2xl text-green-text-color mb-[10px] mt-0 cursor-pointer
			md:text-[32px] md:leading-[44px] xl:mt-[10px] xl:mb-4">{title}</h1>
			</Link>
			<TextTruncate
				containerClassName={`${theme ? "text-white" : "text-dark-gray-text-color"} font-lexend-deca not-italic font-normal text-[16px] leading-[20px] mb-[11px] mt-0 
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
