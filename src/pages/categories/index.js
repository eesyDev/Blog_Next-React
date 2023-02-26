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

    const [categoryData, setCategoryData] = useState(null);
    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/category`);
        const data = await response.json();
        setCategoryData(data);
        }
        fetchData();
    }, [slug]);

  if (!categoryData) {
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
            categoryData.map(category => {
              const count = category.category_posts ? category.category_posts.length : 0
              const articlesNaming = pluralize(count)

              return (
              <div className='col-md-6 mb-4' key={category.id}>
              <div className='category-index__item'>
                <Link href={'categories/'+category.slug} className="title">
                  {category.title}              
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