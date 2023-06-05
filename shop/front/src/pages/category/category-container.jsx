import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { Status } from '../../constants/types';
import { fetchCategories } from './category-slice';
import { CategoryTable } from './category-table';

export const CategoryContainer = () => {
  const { status, categories, error } = useSelector(state => state.categoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === Status.Idle) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const content = (() => {
    switch (status) {
      case Status.Loading:
        return <LinearProgress />;
      case Status.Succeeded:
        return <CategoryTable categories={categories} />;
      case Status.Failed:
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        );
      default:
        return <div>Something weng wrong...</div>
    }
  })();

  return (
    <article>
      <Typography variant="h3">Category List</Typography>
      <section>{content}</section>
    </article>
  );
};
