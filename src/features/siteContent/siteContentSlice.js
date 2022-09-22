import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../client';

const initialState = {
  siteResult: [],
  isLoading: true,
};

export const getSiteContent = createAsyncThunk('getSiteContent', async () => {
  try {
    const data = await client.fetch(`*[_type == "site"]
    {
      hero,
      assortment,
      service,
    }`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const siteContentSlice = createSlice({
  name: 'site',
  initialState,
  extraReducers: {
    [getSiteContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getSiteContent.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.siteResult = action.payload;
    },
    [getSiteContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default siteContentSlice.reducer;
