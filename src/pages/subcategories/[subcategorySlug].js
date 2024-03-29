import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubcategoryData } from '@/redux/slices/subcategorySlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from "next/head";
import Breadcrumbs from '../components/BreadCrumbs';
import Sidebar from '../components/Sidebar';
import PostCategoryItem from '../components/PostCategoryItem';
import Loading from '../components/Loading';
import { setNotFound } from '@/redux/slices/notFoundSlice';
import NotFound from '../404';


function subcategoryId() {
  const router = useRouter();
  const { subcategorySlug } = router.query;
  const dispatch = useDispatch();
  const { subcategoryData, loading, error } = useSelector((state) => state.subcategory);
  const notFound = useSelector((state) => state.notFound);


  useEffect(() => {
    if (subcategorySlug) {
      dispatch(fetchSubcategoryData(subcategorySlug));
    }
  }, [dispatch, subcategorySlug]);

  useEffect(() => {
    if (!loading && !subcategoryData) {
      dispatch(setNotFound(true));
    }
  }, [dispatch, subcategoryData]);

  if (loading) {
    return <Loading/>;
  }

  // if (notFound) {
  //   return <NotFound/>;
  // }
  
  if (error) {
    return <NotFound/>;
  }

  const crumbs = [
    { name: 'главная', path: '/' },
    { name: 'категории', path: '/subcategories' },
    { name: subcategoryData?.name, path: null },
  ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='category-detail'>
            <Header/>
            <div className='category-detail__content mt-5 mb-5'>
                <div className='container'>
                    <div className='category-detail__heading'>
                        <Breadcrumbs crumbs={crumbs}/>
                        <h1 className='category-detail__title '>{subcategoryData?.name}</h1>
                        
                    </div>
                </div>
            </div>
            <div className='category-detail__posts mb-5'>
                <div className='container-xl'>
                    <div className='row'>
                      <div className='col-lg-8'>
                        <div className='category-detail__posts-wrapper'>
                          <div className='row'>
                          {
                            subcategoryData?.sub_posts && subcategoryData?.sub_posts.map((item) => (
                            <div className='col-md-12 col-sm-6 category-detail__post' key={item.id}>
                              <PostCategoryItem 
                                  class='col-sm-6'
                                  // links={'/categories/' + item.category[0].slug + '/' + item.slug}
                                  subLinks={'/subcategories/' + item.subcategory[0].slug + '/' + item.slug}
                                  date={item.formatted_added_time}
                                  content_1={item.content_1}
                                  image_1={item.image_1}
                                  content_2={item.content_2}
                                  image_2={item.image_2}
                                  content_3={item.content_3}
                                  image_3={item.image_3}
                                  slug={item.slug}
                                  category={item.category[0]?.title}
                                  categorySlug={item.category[0]?.slug}        
                                  title={item.title}
                                  tags={item.tags}
                                />
                            </div>
                            ))
                            }
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-4'>
                        <Sidebar/>
                      </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
      </main>
    </>
    
  )
}

export default subcategoryId