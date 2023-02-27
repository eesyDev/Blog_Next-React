export const fetchTagData = (tagSlug) => async (dispatch) => {
    dispatch({ type: 'TAGS_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/tags/${tagSlug}`);
      const tagsData = await response.json();
      console.log(tagsData);
      dispatch({ type: 'TAGS_LOADED', payload: tagsData });
    } catch (error) {
      dispatch({ type: 'TAGS_ERROR', payload: error });
    }
  };


  export const fetchAllTagsData = () => async (dispatch) => {
    dispatch({ type: 'TAGS_LOADING' });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/tags`);
      const allTagsData = await response.json();
      dispatch({ type: 'TAGS_LOADED', payload: allTagsData });
    } catch (error) {
      dispatch({ type: 'TAGS_ERROR', payload: error });
    }
  };
  