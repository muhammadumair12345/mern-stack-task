import * as yup from "yup";

//Signin
export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//User
export const userAddValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  role: yup.string().required("Role is required"),
  password: yup.string().required("Password is required"),
});
