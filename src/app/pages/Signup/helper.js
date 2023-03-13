import * as Yup from "yup";

export const initialValues = {
  pharmacy_name: "",
  email: "",
  location: "",
  phone_number:"",
  password: "",
  confirmPassword: "",
};

export const Schema = Yup.object().shape({
  pharmacy_name: Yup.string().max(255)
    .min(3, "Pharmacy Name must be at least 3 characters.")
    .required(" Pharmacy Name is required"),

  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
    location:Yup.string().max(700).required("Location is required"),

  phone_number: Yup.string().max(255).required("Phone number is required"),
  

landline_number: Yup.number().required("Landline number required"),

  password: Yup.string().max(255).required('Password is required.')
  .min(8, 'Password is too short it should be 8 characters minimum.')
  .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'Password must include one upper case, and at least one number.'),
confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

