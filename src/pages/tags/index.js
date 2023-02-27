import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTagsData } from '@/redux/actions/tagsActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

function AllTags() {
  const dispatch = useDispatch();
  const { allTagsData, loading, error } = useSelector((state) => state.allTags);

  useEffect(() => {
    dispatch(fetchAllTagsData());
  }, [dispatch]);


  function pluralize(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'статья';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return 'статьи';
    } else {
      return 'статей';
    }
  }

  if (!Array.isArray(allTagsData)) {
    return <div>No tags found</div>;
  }


  return (
    <div className='category-index'>
    <Head/>
    <Header/>
    <div className='container'>
      <div className='category-index__wrapper row'>
        <div className='col-md-8 row'>
          
              {
                loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : !allTagsData ? (
                  <div>No tags found</div>
                ) : (
                  allTagsData.map((tag) => {
                    const count = tag.tag_posts ? tag.tag_posts.length : 0;
                    const articlesNaming = pluralize(count);
    
                    return (
                      <div className='col-md-6 mb-4' key={tag.id}>
                        <div className='category-index__item'>
                          <Link href={'tags/' + tag.slug} className='title'>
                            #{tag.name}
                          </Link>
                          <span className='category-index__count'>
                            {count} &nbsp; <span className='dot'></span> &nbsp;{articlesNaming}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )

              }
          
        </div>
        <div className='col-md-4'>
          <Sidebar/>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default AllTags