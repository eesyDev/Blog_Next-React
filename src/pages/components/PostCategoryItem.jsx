import React from 'react';
import Link from 'next/link';

function PostCategoryItem(props) {
    //create announcement
    const postText = props.content_1;
    const words = postText ? postText.split(" ") : '';
    const first10Words = words ? words.slice(0, 10) : '';
    const announcementText = first10Words ? first10Words.join(" ") : '';
    const announcement = announcementText + "...";

  return (
    <div className='post-category-item'>
        <div className='post-category-item__thumb'>
            <div className='inner'>
            {props.subLinks ? 
                <Link href={props.subLinks}><img src={props.image_1} alt={props.name}/></Link> : <Link href={props.links}><img src={props.image_1} alt={props.name}/></Link>
            }
            </div>
        </div>
        <div className='post-category-item__details'>
            <div className='meta'>{props.date}</div>
            <h5 className='post-category-item__title'>{props.subLinks ? <Link href={props.subLinks}>{props.title}</Link> : <Link href={props.links}>{props.title}</Link>}</h5>
            <p className='post-category-item__announce'>{announcement}</p>
            <div className='post-category-item__bottom'>
                <div className='tags'>
                    {
                        props.tags.map(tag => (
                            <Link href={'/tags/' + tag.slug} className={tag.slug} key={tag.slug}>{tag.name}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default PostCategoryItem