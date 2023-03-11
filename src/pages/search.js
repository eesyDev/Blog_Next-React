import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import PostCategoryItem from './components/PostCategoryItem';
import Breadcrumbs from './components/Breadcrumbs';

function Search() {
    const query = useSelector((state) => state.search.query);
    const results = useSelector((state) => state.search.searchData);

    const crumbs = [
        { name: 'главная', path: '/' },
        { name: 'поиск', path: '/search' },
        { name: query, path: null },
      ];
  return (
    <>
      <Head />
      <Header />
        <main>
            <div className='search'>
                <div className='search__heading'>
                    <div className="container-xl">    
                        <h1>Search Results for "{query}"</h1>
                        <Breadcrumbs crumbs={crumbs}/>
                    </div>
                </div>
                <div className='search__wrapper'>
                    <div className="container-xl">       
                        <div className="row">
                            <div className="col-lg-8">
                            {results?.length > 0 ? (
                                results.map((item) => (
                                <div className="category-detail__post" key={item.id}>
                                    <PostCategoryItem
                                    class="col-sm-6"
                                    links={
                                        '/categories/' +
                                        item.category[0]?.slug +
                                        '/' +
                                        item.slug
                                    }
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
                            ) : (
                                <p>No results found for "{query}".</p>
                            )}
                            </div>
                            <div className="col-lg-4">
                            <Sidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        </main>
      <Footer />
    </>
  );
}

export default Search;
