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

const initialState = {
  post: null,
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POST_DATA':
      return {
        ...state,
        postsData: action.payload,
      };
    default:
      return state;
  }
};

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
  },
  middleware: [thunk, ...getDefaultMiddleware()],
})

export default store;