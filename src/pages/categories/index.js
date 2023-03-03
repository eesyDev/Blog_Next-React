import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategoriesData } from '@/redux/actions/categoryActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

function indexSubcategories() {
  const dispatch = useDispatch();
  const { allCategoriesData, loading, error } = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(fetchAllCategoriesData());
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

  if (!Array.isArray(allCategoriesData)) {
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
				  ) : !allCategoriesData ? (
					<div>No categories found</div>
				  ) : (
					allCategoriesData.map(category => {
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