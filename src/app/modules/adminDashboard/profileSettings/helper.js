import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const initialValues = {

  postcode: "",

  file: null,
};
export const Schema = Yup.object().shape({
  postcode: Yup.string()
    .min(3, "First Name must be at least 3 characters.")
    .required(" First Name is required!"),
 
  file: Yup.mixed()
    .nullable()
    .required()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
