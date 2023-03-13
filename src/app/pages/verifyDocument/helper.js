import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const initialValues = {
  id_type:"",
  front_picture: null,
  back_picture:null,
};
export const Schema = Yup.object().shape({
  id_type:Yup.string().required("Identity type is required"),
  front_picture: Yup.mixed()
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
    
  back_picture: Yup.mixed()
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
