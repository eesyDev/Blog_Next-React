import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/_styles.scss';


export default function App({ Component, pageProps }) {
  library.add(fas);
  return  (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}
