import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle, LinearProgress, Typography } from '@mui/material';

import { Status } from '../../constants/types';
import { fetchGroups } from './groups-slice';
import { GroupsTable } from './groups-table';

export const GroupsContainer = () => {
  const { status, error, groups } = useSelector(state => state.groupsState);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (status === Status.Idle) {
        dispatch(fetchGroups());
      }
    },
    [dispatch, status]
  );

  const content = (() => {
    switch (status) {
      case Status.Loading:
        return <LinearProgress />;
      case Status.Succeeded:
        return <GroupsTable groups={groups} />;
      case Status.Failed:
        return (
          <Alert severity='error'>
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
      <section>
        <Typography variant='h3'>Groups</Typography>
        <section>{content}</section>
      </section>
    </article>
  );
};
