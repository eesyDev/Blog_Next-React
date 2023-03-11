import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const key = 'f0d507b8b8014defa8b3ee6e9f85ad3a';

const initialState = {
    nasdaqData: null,
    loading: false,
    error: null,
  };


export const fetchNasdaqData = createAsyncThunk(
    'nasdaq',
    async() => {
        const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=AAPL,VFIAX,AAON,JPM,ZM,TCS&interval=1day&apikey=${key}`);
        return response.data;
    }
)


export const nasdaqSlice = createSlice({
    name: 'nasdaq',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchNasdaqData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNasdaqData.fulfilled, (state, action) => {
          state.nasdaqData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchNasdaqData.rejected, (state, action) => {
          state.nasdaqData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default nasdaqSlice.reducer;