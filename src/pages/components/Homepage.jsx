import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from './PostItem';
import Sidebar from './Sidebar';
import { fetchAllPostsData } from '@/redux/slices/allPostsSlice';


function Homepage() {
    const dispatch = useDispatch();
    const { allPostsData, loading, error } = useSelector((state) => state.allPosts);
  
    useEffect(() => {
      dispatch(fetchAllPostsData());
    }, [dispatch]);

    return (
        <div className='container-xl'>
          <div className='mb-5 row'>
            <div className='posts row col-lg-8'>
              {
                  allPostsData && allPostsData.map((item) => (
                      <PostItem key={item.id}
                        class='col-sm-6'
                        links={'/categories/' + item.category[0]?.slug + '/' + item.slug}
                        subLinks={`/subcategories/${item.subcategory[0]?.slug ? item.subcategory[0].slug + '/' : ''}${item.slug}`}
                        date={item.formatted_added_time}
                        content_1={item.content_1}
                        image_1={item.image_1}
                        content_2={item.content_2}
                        image_2={item.image_2}
                        content_3={item.content_3}
                        image_3={item.image_3}
                        slug={item.slug}
                        subcategory={item.subcategory[0]?.name}
                        subcategorySlug={item.subcategory[0]?.slug}
                        category={item.category[0]?.title}
                        categorySlug={item.category[0]?.slug}
                        title={item.title}
                        tags={item.tags}
                      />
                  ))
              }
            </div>
            <div className='col-lg-4'>
              <Sidebar/>
            </div>
        </div>
        </div>
    )
}

export default Homepage