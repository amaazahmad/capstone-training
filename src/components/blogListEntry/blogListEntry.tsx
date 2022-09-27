//react imports
import { useEffect, useState } from 'react';

//third party packes
import TextTruncate from 'react-text-truncate';
import { DocumentData } from "firebase/firestore"
import { Link } from 'react-router-dom';

//styles
import "./blogListEntry.css"

const BlogListEntry = ({blog}:DocumentData) => {
	const{ title, email, content, date }= blog;
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
	}
	
	useEffect(()=>{
		window.addEventListener('resize', updateScreenSize);

		return(()=>{window.removeEventListener('resize', updateScreenSize)})
	})

	return (
		<div className="entry-container">
			{screenWidth >= 768 ? <p className="entry-date">{date.toDate().toLocaleString('default',{month:'long', day:'numeric'}).toUpperCase()}</p> : <></>}
			<h1 className="entry-title">{title}</h1>
			<TextTruncate containerClassName='entry-content' line={screenWidth < 768 ? 9 : 5} element="p" truncateText='' text={content} textTruncateChild={<Link className='read-more' to="#">...read more</Link>}></TextTruncate>
			<div className='date-email-container'>

				{screenWidth < 768 ? <p className="entry-date">{date.toDate().toLocaleString('default',{month:'long', day:'numeric'}).toUpperCase()}</p> : <></>}
				<p className="entry-email">{email}</p>
			</div>
		</div>
	)
}

export default BlogListEntry
