import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './currency/currency-slice';
import { orderReducer } from '../order/order-slice';
import { categoryReducer, groupsReducer, productsReducer } from '../pages';

export const rootStore = configureStore({
  reducer: {
    currencyState: currencyReducer,
    categoryState: categoryReducer,
    productsState: productsReducer,
    groupsState: groupsReducer,
    shoppingCart: orderReducer,
  },
});
