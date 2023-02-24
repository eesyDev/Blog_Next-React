import React from 'react'

function PostSideItem(props) {
  return (
    <div className='post'>
        <div className='post__thumb'>
            <a href={props.link}>
                <div className='post__thumb-inner'>
                    <img src={props.img_1} alt={props.name}/>
                </div>
            </a>
        </div>
        <div className='post__details'>
            <h6 className='post__title'><a href={props.link}>{props.name}</a></h6>
            <span className='meta'>{props.date}</span>
        </div>
    </div>
  )
}

export default PostSideItem;