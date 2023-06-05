import { object, string } from 'yup';

const emailGlob = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const validationSchema = object().shape({
  firstName: string()
    .required('First name is required')
    .min(2, 'Must be 2 characters or more')
    .max(15, 'Must be 15 characters or less'),
  lastName: string()
    .required('Last name is required')
    .max(20, 'Must be 20 characters or less'),
  email: string()
    .matches(emailGlob, { message: 'Incorrect format' })
    .required('E-mail is required')
});
