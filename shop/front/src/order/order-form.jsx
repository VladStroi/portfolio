import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';

export const OrderForm = ({
  isSubmitAllowed,
  onClose,
  onSubmit,
  formHandleSubmit,
  register,
  errors,
  children,
}) => {
  return (
    <form onSubmit={formHandleSubmit(onSubmit)} noValidate>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                type="string"
                {...register('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName ? errors.firstName.message : " "}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                type="string"
                {...register('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName ? errors.lastName.message : " "}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                {...register('email')}
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : " "}
              />
            </Grid>
          </Grid>
          {children}
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={!isSubmitAllowed}
          >
            Place Order
          </Button>
          <Button size="small" onClick={onClose}>
            Continue shopping
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
