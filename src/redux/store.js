import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import postReducer from './reducers/postsReducer';
import subcategoryReducer from './reducers/subcategoryReducer';
import categoryReducer from './reducers/categoryReducer';
import tagsReducer from './reducers/tagsReducer';
import allTagsReducer from './reducers/allTagsReducer';
import allSubcategoriesReducer from './reducers/allSubcategoriesReducer';
import allCategoriesReducer from './reducers/allCategoriesReducer';

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
    subcategory: subcategoryReducer,
    category: categoryReducer,
    tag: tagsReducer,
    allTags: allTagsReducer,
    allSubcategories: allSubcategoriesReducer,
    allCategories: allCategoriesReducer
  },
})

export default store;