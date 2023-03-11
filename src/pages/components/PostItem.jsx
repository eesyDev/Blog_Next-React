import React from 'react';
import Link from 'next/link';


function PostItem(props) {
    //create announcement
    const postText = props.content_1;
    const words = postText ? postText.split(" ") : '';
    const first10Words = words ? words.slice(0, 10) : '';
    const announcementText = first10Words ? first10Words.join(" ") : '';
    const announcement = announcementText + "...";


    return (
        <div className={'post-item mb-5 ' + props.class}>    
            <div className='post-item__inner'>
                <div className='post-item__thumb'>
                    <div className='image'>
                    {   props.subcategory ? 
                        <Link href={'/subcategories/' + props.subcategorySlug} className="category-badge btn-main btn">{props.subcategory}</Link> 
                        :
                        <Link href={'/categories/' + props.categorySlug} className="category-badge btn-main btn">
                            {props.category}
                        </Link>
                    }
                        <div>
                            {props.subcategory ? 
                            <Link href={props.subLinks}><img src={props.image_1} alt={props.name}/></Link> : <Link href={props.links}><img src={props.image_1} alt={props.name}/></Link>
                            }                      
                        </div>
                            
                    </div>
                </div>
                <div className='post-item__details'>
                    <div className='meta'><span className='date'>{props.date}</span></div>
                    <h5 className='post-item__title mb-3 mt-3'>
                        {props.subLinks ? 
                            <Link href={props.subLinks}>
                                {props.title}
                            </Link> : 
                            <Link href={props.links}>
                                {props.title}
                            </Link>
                        } 
                    </h5>
                    <p className='post-item__announce' dangerouslySetInnerHTML={{ __html: announcement}}/>
                </div>
                <div className='post-item__bottom'>
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

export default PostItem;