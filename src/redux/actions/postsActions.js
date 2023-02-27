export const fetchPostData = (postSlug) => async (dispatch) => {
    dispatch({ type: 'POST_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${postSlug}`);
      const data = await response.json();
      dispatch({ type: 'POST_LOADED', payload: data });
    } catch (error) {
      dispatch({ type: 'POST_ERROR', payload: error });
    }
  };
  