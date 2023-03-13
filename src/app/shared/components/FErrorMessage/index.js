import React from "react";
import { ErrorMessage } from "formik";

const FErrorMessage = ({ name }) => {
  return (
    <div style={{ color: "#d32f2f",fontSize:"0.75rem" }}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default FErrorMessage;