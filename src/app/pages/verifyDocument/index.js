import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Grid, IconButton } from "@mui/material";
import AuthLayout from "../../shared/components/authLayout";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PreviewImage from "../../modules/adminDashboard/profileSettings/PreviewImage";
import FErrorMessage from "../../shared/components/FErrorMessage";
import { uploadVerificationDocsDetails } from "../../services/auth";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "../verifyDocument/verifydocument.scss";


const VerifyDocument = () => {
    let params = useParams()
    const id=params?.id
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const loading = useSelector(
    (state) => state.auth.uploadVerificationDocs?.loading
  );
  const frontPictureRef = useRef(null);
  const location = useLocation();
  const backPictureRef = useRef(null);
   const pharmacyId = location?.state?.pharmacyId;
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          dispatch(uploadVerificationDocsDetails(values, id ? id : pharmacyId, toast,navigate,id ? true :false));
        }}
        validationSchema={Schema}
      >
        {(props) => (
          <>
            {console.log(props.values, "Values>>>")}
            <AuthLayout>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Verify Document
                </Typography>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Please upload Photo of one of your document
                </Typography>
              </Box>
              <form autoComplete="off" onSubmit={props.handleSubmit}>
                {/*  <TextField
                  fullWidth
                  placeholder="Identity type"
                  value={props.values.id_type}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="id_type"
                  error={props.touched.id_type && Boolean(props.errors.id_type)}
                  helperText={props.touched.id_type && props.errors.id_type}
                  required
                />*/}
                <Box
                  py={2}
                  sx={{
                    "& .MuiTextField-root": { my: 2 },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Identity type
                    </InputLabel>
                    <Select
                      name="id_type"
                      value={props.values.id_type}
                      onChange={props.handleChange}
                      error={
                        props.touched.id_type && Boolean(props.errors.id_type)
                      }
                      helperText={props.touched.id_type && props.errors.id_type}
                      required
                    >
                      <MenuItem value={10}>NIC Card</MenuItem>
                      <MenuItem value={20}>Driving License</MenuItem>
                      <MenuItem value={30}>Passport</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid container mt={3} spacing={2}>
                    <Grid item xs={6} md={6}>
                      <Box
                        className={"image-upload-container"}
                        gutterBottom
                        mb={3}
                      >
                        <Typography
                          variant="body"
                          sx={{ position: "absolute" }}
                        >
                          {" "}
                          Front Picture
                        </Typography>

                        {props.values.front_picture && (
                          <PreviewImage file={props.values.front_picture} />
                        )}
                      </Box>
                      <input
                        hidden
                        type="file"
                        onChange={(e) => {
                          props.setFieldValue(
                            "front_picture",
                            e.target.files[0]
                          );
                        }}
                        ref={frontPictureRef}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        sx={{ marginTop: "40px" }}
                        variant="outlined"
                        className="containedPrimary"
                        onClick={() => frontPictureRef.current.click()}
                      >
                        Upload Front Picture
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Box
                        className={"image-upload-container"}
                        gutterBottom
                        mb={3}
                      >
                        <Typography
                          variant="body"
                          sx={{ position: "absolute" }}
                        >
                          Back Picture
                        </Typography>
                        {props.values.back_picture && (
                          <PreviewImage file={props.values.back_picture} />
                        )}
                      </Box>
                      <input
                        hidden
                        type="file"
                        onChange={(e) => {
                          props.setFieldValue(
                            "back_picture",
                            e.target.files[0]
                          );
                        }}
                        ref={backPictureRef}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        sx={{ marginTop: "40px" }}
                        variant="outlined"
                        className="containedPrimary"
                        onClick={() => backPictureRef.current.click()}
                      >
                        Upload Back Picture
                      </Button>
                      <FErrorMessage name="back_picture" />
                    </Grid>
                  </Grid>
                  <Button
                    className="containedPrimary"
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={props.handleSubmit}
                  >
                    {loading ? (
                      <ClipLoader size={25} color="white" loading />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                  <ToastContainer />
                </Box>
              </form>
            </AuthLayout>
          </>
        )}
      </Formik>
    </>
  );
};

export default VerifyDocument;
