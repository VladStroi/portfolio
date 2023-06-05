import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const OrderStatus = {
  Ready: 'Ready',
  Busy: 'Busy',
  Placed: 'Placed',
  Error: 'Error',
}

const initialState = {
  isCartOpen: false,
  orderStatus: OrderStatus.Ready,
  items: [],
  amount: 0,
  total: 0,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload) => {
    const response = await api.placeOrder(payload);
    return response.data;
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openCart: (state) => {
      state.orderStatus = OrderStatus.Ready;
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      if (state.orderStatus === OrderStatus.Busy) {
        return;
      }
      state.isCartOpen = false;
    },
    addToCart: (state, { payload }) => {
      const productItem = state.items.find(product => product.id === payload.id);
      if (productItem) {
        productItem.quantity += 1;
      } else {
        state.items = [payload, ...state.items];
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, { payload }) => {
      state.items = state.items.filter(product => product.id !== payload.id);
    },
    updateProductQuantity: (state, { payload }) => {
      const productItem = state.items.find((item) => item.id === payload.id);
      productItem.quantity = payload.quantity;
    },
    calculateTotals: (state) => {
      const { amount, total } = state.items.reduce(
        ({ amount, total }, item) => ({
          amount: amount + item.quantity,
          total: total + (item.quantity * item.price),
        }),
        { amount: 0, total: 0 }
      );
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.orderStatus = OrderStatus.Busy;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderStatus = OrderStatus.Placed;
        state.items = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderStatus = OrderStatus.Error;
        state.error = action.error.message;
      });
  }
});

export const {
  openCart,
  closeCart,
  clearCart,
  removeItem,
  updateProductQuantity,
  decrease,
  calculateTotals,
  addToCart,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;