import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSubcategoriesData } from '@/redux/slices/allSubcategoriesSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

function indexSubcategories() {
  const dispatch = useDispatch();
  const { allSubcategoriesData, loading, error } = useSelector((state) => state.allSubcategories);

  useEffect(() => {
    dispatch(fetchAllSubcategoriesData());
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
  if (!Array.isArray(allSubcategoriesData)) {
    return <div>No categories found</div>;
  }

  return (
    <div className='category-index'>
    <Head/>
    <Header/>
    <div className='container-xl'>
      <div className='category-index__wrapper row'>
        <div className='col-md-8 row'>
          {
            loading ? (
              <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : !allSubcategoriesData ? (
                  <div>No categories found</div>
                ) : (
                    allSubcategoriesData.map(category => {
                        const count = category.sub_posts ? category.sub_posts.length : 0
                        const articlesNaming = pluralize(count)
          
                        return (
                        <div className='col-md-6 mb-4' key={category.id}>
                        <div className='category-index__item'>
                          <Link href={'subcategories/' + category.slug} className="title">
                            {category.name}              
                          </Link>
                          <span className='category-index__count'>
                              {count} &nbsp; <span className='dot'></span> &nbsp;{articlesNaming}
                          </span>
                        </div>
                        </div>
                      )}
				 )
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