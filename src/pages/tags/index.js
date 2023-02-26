import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

function indexSubcategories() {
    const router = useRouter()
    const { slug } = router.query

    const [tagsData, setCategoryData] = useState(null);
    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/tags`);
        const data = await response.json();
        setCategoryData(data);
        }
        fetchData();
    }, [slug]);

  if (!tagsData) {
    return <div>Loading...</div>;
  }

  function pluralize(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'статья';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return 'статьи';
    } else {
      return 'статей';
    }
  }


  return (
    <div className='category-index'>
    <Head/>
    <Header/>
    <div className='container'>
      <div className='category-index__wrapper row'>
        <div className='col-md-8 row'>
          {
            tagsData.map(tag => {
              const count = tag.tag_posts ? tag.tag_posts.length : 0
              const articlesNaming = pluralize(count)

              return (
              <div className='col-md-6 mb-4' key={tag.id}>
              <div className='category-index__item'>
                <Link href={'tags/' + tag.slug} className="title">
                  #{tag.name}              
                </Link>
                <span className='category-index__count'>
                    {count} &nbsp; <span className='dot'></span> &nbsp;{articlesNaming}
                </span>
              </div>
              </div>
            )}
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

export default indexSubcategories