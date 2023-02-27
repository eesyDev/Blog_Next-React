export const fetchCategoryData = (categorySlug) => async (dispatch) => {
    dispatch({ type: 'CATEGORY_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/category/${categorySlug}`);
      const data = await response.json();
      dispatch({ type: 'CATEGORY_LOADED', payload: data });
    } catch (error) {
      dispatch({ type: 'CATEGORY_ERROR', payload: error });
    }
  };
  

export const fetchAllCategoriesData = () => async (dispatch) => {
    dispatch({ type: 'CATEGORY_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/category`);
      const data = await response.json();
      dispatch({ type: 'CATEGORY_LOADED', payload: data });
    } catch (error) {
      dispatch({ type: 'CATEGORY_ERROR', payload: error });
    }
  };
  