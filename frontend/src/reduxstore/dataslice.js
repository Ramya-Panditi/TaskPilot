import {baseURL} from "../Links"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("users/getData", async () => {
  const id = sessionStorage.getItem('id') || localStorage.getItem('id');
  console.log(id);
  const response = await fetch(`${baseURL}/show/${id}`, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});
// Slice
export const dataslice = createSlice({
  name: "userdb",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default dataslice.reducer;
