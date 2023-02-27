export const fetchSubCategoryData = (subcategorySlug) => async (dispatch) => {
    dispatch({ type: 'CATEGORY_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/subcategory/${subcategorySlug}`);
      const data = await response.json();
      dispatch({ type: 'CATEGORY_LOADED', payload: data });
    } catch (error) {
      dispatch({ type: 'CATEGORY_ERROR', payload: error });
    }
  };

  export const fetchAllSubCategoriesData = () => async (dispatch) => {
    dispatch({ type: 'CATEGORY_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/subcategory`);
      const allSubcategoriesData = await response.json();
      dispatch({ type: 'CATEGORY_LOADED', payload: allSubcategoriesData });
    } catch (error) {
      dispatch({ type: 'CATEGORY_ERROR', payload: error });
    }
  };
  
  