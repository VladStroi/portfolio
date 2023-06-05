import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../constants/types';
import { api } from '../../services/api';

export const fetchCurrency = createAsyncThunk(
  'currency/getAll',
  async () => {
    const response = await api.getCurrencies();
    return response.data;
  },
);

export const currenciesSlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
    currentCurrency: undefined,
    error: undefined,
    status: Status.Idle,
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.currencies = action.payload.items;
        state.currentCurrency = action.payload.items[0];
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message;
      });
  },
});

export const { changeCurrency } = currenciesSlice.actions;
export const currencyReducer = currenciesSlice.reducer;
