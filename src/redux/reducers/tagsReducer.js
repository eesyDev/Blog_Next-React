const initialState = {
    tagsData: null,
    loading: false,
    error: null,
  };
  
  const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TAGS_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'TAGS_LOADED':
        return {
          ...state,
          tagsData: action.payload,
          loading: false,
          error: null,
        };
      case 'TAGS_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tagsReducer;
  