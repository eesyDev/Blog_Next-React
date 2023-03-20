import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/_styles.scss';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import NotFound from './404';



export default function App({ Component, pageProps }) {
  library.add(fas);
  const router = useRouter()
  const query = router.query;
  const parsedQuery = queryString.parse(query);
  
  return  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInner Component={Component} pageProps={pageProps} parsedQuery={parsedQuery}/>
      </PersistGate>
    </Provider>
  )
}

const AppInner = ({ Component, pageProps, parsedQuery, err }) => {
  const { mode } = useSelector((state) => state.mode);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <>
      {err && err.statusCode === 404 ? (
        <NotFound/>
      ): (
        <Component {...pageProps} parsedQuery={parsedQuery} />
      )
      }
    </>
    
  )
}