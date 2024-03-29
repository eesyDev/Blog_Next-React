import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostData } from '@/redux/slices/postSlice';
import Head from 'next/head';
import Header from '@/pages/components/Header';
import Footer from '@/pages/components/Footer';
import Breadcrumbs from '@/pages/components/Breadcrumbs';
import Sidebar from '@/pages/components/Sidebar';
import Loading from '@/pages/components/Loading';

function PostDetail() {
  const router = useRouter();
  const { postSlug } = router.query;
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);


  useEffect(() => {
    dispatch(fetchPostData(postSlug));
  }, [dispatch, postSlug]);

  useEffect(() => {
    if (!postData) {
      dispatch(setNotFound(true));
    }
  }, [dispatch, postData]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!postData) {
    return <div>No post found</div>;
  }

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

console.log(postData);
  return (
    <>
      <Head/>
      <main>
        <div className='post-detail'>
          <Header/>
          <div className='container'>
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
      </main>
    </>
  )
}

export default PostDetail