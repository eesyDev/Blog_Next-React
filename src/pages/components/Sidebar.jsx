import React, { useState, useEffect } from 'react';
import { CurlLine } from './icons';
import PostSideItem from './PostSideItem';
import Link from 'next/link';


function Sidebar() {
  const [tagData, setTagData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/tags`);
      const data = await response.json();
      setTagData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/subcategory/stocks/`);
      const data = await response.json();
      setCategoryData(data);
    }
    fetchData();
  }, []);
  return (
    <div className='sidebar'>
      <div className='tags-cloud sidebar-part'>
        <div className='sidebar-part__heading'>
          <h4>Теги</h4>
          <span><CurlLine/></span>
          </div>
          <div className='sidebar-part__content  mt-3'>
            <div className='tags'>
                {
                    tagData && tagData.map(tag => (
                      <Link href={'/tags/' + tag.slug} className={tag.slug} key={tag.slug}>{tag.name}</Link>
                    ))
                }
            </div>
          </div>
      </div>
      <div className='category-posts sidebar-part'>
          <div className='sidebar-part__heading'>
              <h4>{categoryData && categoryData.name}</h4>
              <span><CurlLine/></span>
          </div>
          <div className='side-part__content mt-3'>
            {
              categoryData && categoryData.sub_posts.map((post) => (
                <PostSideItem
                key={post.id}
                link={post.id}
                img_1={post.image_1}
                date={post.formatted_added_time}
                name={post.title}
                />
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default Sidebar