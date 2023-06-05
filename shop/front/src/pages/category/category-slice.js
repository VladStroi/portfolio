import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../constants/types';
import { api } from '../../services/api';

export const fetchCategories = createAsyncThunk(
  'category/getAll',
  async () => {
    const response = await api.getCategories();
    return response.data;
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    error: undefined,
    status: Status.Idle,
  },
  reducers: {
    toIdleStatus: (state) => {
      state.status = Status.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.categories = action.payload.items;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message;
      });
  },
});

export const { toIdleStatus: setCategotyIdleStatus } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
