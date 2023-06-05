import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchema } from './validation';
import { OrderForm } from './order-form';
import { OrderItems } from './order-items';
import { useDispatch } from 'react-redux';
import { placeOrder } from './order-slice';

export const OrderContainer = ({ onClose, cartItems, total }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = ({ firstName, lastName, email }) => {
    dispatch(
      placeOrder({
        firstName,
        lastName,
        email,
        cartItems,
      })
    );
  };

  const isSubmitAllowed = useMemo(() => cartItems.length, [cartItems]);

  return (
    <OrderForm
      isSubmitAllowed={isSubmitAllowed}
      onClose={onClose}
      onSubmit={submit}
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
    >
      <OrderItems cartItems={cartItems} total={total} />
    </OrderForm >
  );
};
