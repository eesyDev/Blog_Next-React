import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostData } from '@/redux/slices/postSlice';
import Header from "@/pages/components/Header"
import Footer from "@/pages/components/Footer"
import Breadcrumbs from '@/pages/components/Breadcrumbs';
import Sidebar from '@/pages/components/Sidebar';
import NotFound from '@/pages/404';

function PostDetail() {
  const router = useRouter();
  const { postSlug } = router.query;
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);



  useEffect(() => {
    dispatch(fetchPostData(postSlug));
  }, [dispatch, postSlug]);

  if (!loading && !postData) {
    return <div>Error</div>
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound/>;
  }

  // useEffect(() => {
  //   if (!loading && !postData) {
  //     // Redirect to the custom 404 page
  //     router.replace('/404');
  //   }
  // }, [postData]);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }

  const truncatedTitle = postData.title ? truncateString(postData.title, 20) : ''
  const crumbs = [
    { name: 'главная', path: '/' },
    { name: 'категории', path: '/categories' },
    { name: truncatedTitle, path: null },
  ];
    return (
      <div className='post-detail'>
        <Header/>
        <div className='container-lg'>
            <div className='row'>
              <div className='col-lg-8'>
                <div className='post-detail__wrapper'>
                  <div className='post-detail__heading'>
                    <Breadcrumbs crumbs={crumbs}/>
                    <h1 className='title'>{postData.title}</h1>
                    <div className='meta'>{postData.formatted_added_time}</div>
                  </div>
                  <article className='post-detail__content'>
                    <div className='post-detail__main-image'>
                      <img src={postData.image_1} alt={postData.title}/>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: postData.content_1 }}/>
                    {
                      postData.image_2 && <img src={postData.image_2} alt={postData}/> 
                    }
                    {
                      postData.content_2 && <p dangerouslySetInnerHTML={{ __html: postData.content_2 }}/>
                    }
                    {
                      postData.image_3 && <img src={postData.image_3} alt={postData}/> 
                    }
                    {
                      postData.content_3 && <p dangerouslySetInnerHTML={{ __html: postData.content_3 }}/>
                    }
                  </article>
                </div>
              </div>
              <div className='col-lg-4'>
                <Sidebar/>
              </div>
            </div>
          </div>
        <Footer/>
      </div>
    )
  }
  
  export default PostDetail