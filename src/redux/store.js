import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import tagReducer from './slices/tagSlice';
import allCategoriesReducer from './slices/allCategoriesSlice';
import thunk from 'redux-thunk';
import postReducer from './slices/postSlice';
import allTagsReducer from './slices/allTagsSlice';
import subcategoryReducer from './slices/subcategorySlice';
import allSubcategoriesReducer from './slices/allSubcategoriesSlice';
import sidebarCategoryReducer from './slices/sidebarCategorySlice';
import allPostsReducer from './slices/allPostsSlice';
import nasdaqReducer from './slices/nasdaqSlice';
import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';
import notFoundReducer from './slices/notFoundSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';

const searchPersistConfig = {
  key: 'search',
  storage,
  blacklist: ['register'], // Add blacklist to ignore non-serializable function
};

const persistedReducer = persistReducer(searchPersistConfig, searchReducer);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (value) => typeof value !== 'function',
  ignoredActions: ['persist/PERSIST'],
  ignoredActionPaths: ['register'],
  ignoredPaths: ['register'],
  onError: (error) => {
    console.log('Non-serializable value:', error.payload);
  }
});

export const store = configureStore({
  reducer: {
    post: postReducer,
    allPosts: allPostsReducer,
    subcategory: subcategoryReducer,
    category: categoryReducer,
    tag: tagReducer,
    allTags: allTagsReducer,
    allSubcategories: allSubcategoriesReducer,
    allCategories: allCategoriesReducer,
    sidebarCategory: sidebarCategoryReducer, 
    nasdaq: nasdaqReducer,
    mode: themeReducer, 
    search: persistedReducer,
    notFound: notFoundReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;
