import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Typography } from '@mui/material';

import { Status } from '../../constants/types';
import { fetchProducts } from './products-slice';
import { ProductsTable, rowsPerPageOptions } from './products-table';

const defaultRowsPerPage = rowsPerPageOptions[0];

export const ProductsContainer = () => {
  const dispatch = useDispatch();
  const {
    status,
    products,
    totalCount,
  } = useSelector(state => state.productsState);

  useEffect(
    () => {
      if (status === Status.Idle) {
        dispatch(fetchProducts({ pagination: { skip: 0, take: defaultRowsPerPage } }));
      }
    },
    [dispatch, status]
  );

  const requestProducts = pagination => dispatch(fetchProducts({ pagination }));

  const isLoading = status === Status.Loading;

  return (
    <article>
      <section>
        <Typography variant="h3">Product list</Typography>
        {isLoading && <LinearProgress />}
        <ProductsTable
          products={products}
          onChange={requestProducts}
          totalCount={totalCount}
          defaultRowsPerPage={defaultRowsPerPage}
        />
      </section>
    </article>
  );
};
