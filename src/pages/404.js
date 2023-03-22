import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import { NotFoundIcon } from './components/icons';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function NotFound() {
  const notFound = useSelector((state) => state.notFound);
  const router = useRouter()

  useEffect(() => {
    if (!notFound) {
      router.push('/');
    }
    return () => {
      // Cancel the redirect when the component unmounts
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [notFound, router]);

  const handleRouteChange = () => {
    // Cancel the redirect if the user navigates away
    router.events.off('routeChangeStart', handleRouteChange);
  };
  
  return (
    notFound && (
    <>  
        <Head/>
        <main>
            <Header/>
            <div className='not-found'>
                <NotFoundIcon/>
            </div>
            <Footer/>
        </main>
    </>
    )
  )
}

export default NotFound