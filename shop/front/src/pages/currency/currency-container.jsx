import * as React from 'react';
import { useSelector } from 'react-redux';
import { Alert, AlertTitle, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { Status } from '../../constants/types';
import { CurrencyTable } from './currency-table';

export const CurrenciesTable = () => {
  const {
    status,
    error,
    currencies,
  } = useSelector(state => state.currencyState);

  const content = (() => {
    switch (status) {
      case Status.Loading:
        return <LinearProgress />;
      case Status.Succeeded:
        return <CurrencyTable currencies={currencies} />;
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
      <Typography variant="h3">Currency List</Typography>
      <section>{content}</section>
    </article>
  );
};
