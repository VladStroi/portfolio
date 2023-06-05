import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../constants/types';
import { api } from '../../services/api';

export const fetchGroups = createAsyncThunk(
  'groups/getAll',
  async () => {
    const response = await Promise.all([
      api.getProducts(),
      api.getCategories(),
    ]);
    const [products, categories] = response;
    if (products.data.items.length && categories.data.items.length) {
      return products.data.items
        .map(product => {
          const category = categories.data.items.find(category => category.id === product.category) ?? {
            // in case if category is not set for product on server side (btw, is it possible?)
            // use unknown category
            id: -1,
            name: 'Unkown category',
          };
          return {
            ...product,
            category,
          };
        })
        .reduce((groups, product) => {
          let categoryIndex = groups.findIndex(
            group => product.category.id === group.categoryId
          );
          let group;
          if (categoryIndex < 0) {
            group = {
              categoryName: product.category.name,
              categoryId: product.category.id,
              products: [],
            };
            groups.push(group);
          } else {
            group = groups[categoryIndex];
          }
          group.products.push(product);
          return groups;
        }, []);
    }

    return [];
  }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    value: 0,
    groups: [],
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
      .addCase(fetchGroups.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message;
      });
  },
});

export const { toIdleStatus: setGroupsIdleStatus } = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;
