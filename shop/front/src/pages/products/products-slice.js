import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../constants/types';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/getAll',
  async (params) => {
    const response = await api.getProducts(params);
    return response.data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    totalCount: 0,
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
      .addCase(fetchProducts.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.products = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message;
      });
  },
});

export const { toIdleStatus: setProductsIdleStatus } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
