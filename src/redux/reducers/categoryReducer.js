const initialState = {
    categoryData: null,
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORY_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'CATEGORY_LOADED':
        return {
          ...state,
          categoryData: action.payload,
          loading: false,
          error: null,
        };
      case 'CATEGORY_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  