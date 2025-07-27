import * as yup from 'yup';

export const loginUserSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('email is required'),
    password: yup.string().required('password is required'),
  }),
});
