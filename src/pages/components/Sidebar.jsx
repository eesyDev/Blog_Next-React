import React, { useEffect } from 'react';
import { CurlLine } from './icons';
import PostSideItem from './PostSideItem';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTagsData } from '@/redux/slices/allTagsSlice';
import { fetchSidebarCategoryData } from '@/redux/slices/sidebarCategorySlice';


function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarCategoryData } = useSelector((state) => state.sidebarCategory);

  useEffect(() => {
      dispatch(fetchSidebarCategoryData());
  }, [dispatch]);


  const { allTagsData, loading, error } = useSelector((state) => state.allTags);

  useEffect(() => {
    dispatch(fetchAllTagsData());
  }, [dispatch]);

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
                    allTagsData && allTagsData.map(tag => (
                      <Link href={'/tags/' + tag.slug} className={tag.slug} key={tag.slug}>{tag.name}</Link>
                    ))
                }
            </div>
          </div>
      </div>
      <div className='category-posts sidebar-part'>
          <div className='sidebar-part__heading'>
              <h4>{sidebarCategoryData && sidebarCategoryData.name}</h4>
              <span><CurlLine/></span>
          </div>
          <div className='side-part__content mt-3'>
            {
              sidebarCategoryData && sidebarCategoryData.sub_posts && sidebarCategoryData.sub_posts.map((post) => (
                <PostSideItem
                key={post.id}
                link={'/subcategories/' + post.subcategory[0].slug + '/' + post.slug}
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