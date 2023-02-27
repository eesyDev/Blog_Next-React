const initialState = {
    postData: null,
    loading: false,
    error: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'POST_LOADED':
        return {
          ...state,
          postData: action.payload,
          loading: false,
          error: null,
        };
      case 'POST_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  