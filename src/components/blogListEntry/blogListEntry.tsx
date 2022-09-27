//react imports
import { useEffect, useState } from 'react';

//third party packes
import TextTruncate from 'react-text-truncate';
import { DocumentData } from "firebase/firestore"
import { Link } from 'react-router-dom';


const BlogListEntry = ({ blog }: DocumentData) => {
	const { title, email, content, date } = blog;
	const dateToDisplay = date.toDate().toLocaleString('default', { month: 'long', day: 'numeric' }).toUpperCase();
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

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
				<p className="font-lexend-deca not-italic font-semibold text-[24px] leading-8 text-dark-gray-text-color">
					{dateToDisplay}
				</p>
				:
				<></>}
			<h1 className="font-dm-serif-display not-italic font-normal text-2xl text-green-text-color mb-[10px] mt-0 cursor-pointer
			md:text-[32px] md:leading-[44px] xl:mt-[10px] xl:mb-4">{title}</h1>
			<TextTruncate containerClassName='font-lexend-deca not-italic font-normal text-[16px] leading-[20px] mb-[11px] mt-0 text-dark-gray-text-color
			md:text-[20px] md:leading-[25px]' line={screenWidth < 768 ? 9 : 5} element="p" truncateText='' text={content} textTruncateChild={<Link className='font-lexend-deca not-italic font-normal text-base leading-5 text-green-text-color cursor-pointer md:text-xl md:leading-6' to="#">...read more</Link>}></TextTruncate>
			<div className='flex flex-row justify-between '>
				{screenWidth < 768 ?
					<p className="font-lexend-deca not-italic font-semibold text-[16px] leading-5 text-dark-gray-text-color">
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
