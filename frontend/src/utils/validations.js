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
export const userValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  addresses: yup.array().of(
    yup.object().shape({
      addressLine1: yup.string().required("Address Line 1 is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      country: yup.string().required("Country is required"),
    })
  ),
  role: yup.string().required("Role is required"),
  phoneNo: yup.string().required("Phone No is required"),
});
