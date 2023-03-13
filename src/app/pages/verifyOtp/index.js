import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Grid, IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { ArrowBack, Countertops } from "@mui/icons-material";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import AuthLayout from "../../shared/components/authLayout";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  pharmacyResendVerificationOtp,
  pharmacyVerificationOtp,
} from "../../services/auth";
const VerifyOtp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.auth?.pharmacyVerifyOtp?.loading);
  const reLoading = useSelector((state) => state?.auth?.resendVerifyOtp?.loading);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location, "Location>>>>");
  const email = location?.state?.email;
  const pharmacyId = location?.state?.id;
  console.log(pharmacyId, "sea");

  // const [counter, setCounter] = useState(120);
  const[seconds,setSeconds]=useState(59)
  const [minutes,setMinutes]=useState(1)

  useEffect(() => {
    // const timer = setInterval(() => setCounter((prev)=>{
    //     return prev-1
    // }), 1000);
  //  const timer= counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  const timer=setInterval(()=>{
    minutes>=0&&setSeconds(seconds-1)
    if(seconds===0){
      setSeconds(59)
      setMinutes(minutes-1)
    }

  },1000)
   const debounce=setInterval(()=>{
    dispatch(pharmacyResendVerificationOtp(pharmacyId, email))
    // setCounter(120)
    setSeconds(60)
    setMinutes(1)
   },12000)
  
    return(()=>{
      clearInterval(timer)
      clearInterval(debounce)
    })
  }, [seconds,minutes]);
  // const handleResendCode = () => {
  //   dispatch(pharmacyResendVerificationOtp(pharmacyId, email));
  // };
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          console.log(values, "otp");
          dispatch(
            pharmacyVerificationOtp(values, pharmacyId, toast, navigate)
          );
        }}
        validationSchema={Schema}
      >
        {(props) => (
          <>
            <AuthLayout>
              <Box>
                <Box pb={4}>
                  <Typography variant="h4" gutterBottom>
                    Verify OTP
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    We have sent an OTP code to your {email} please enter the
                    code below
                  </Typography>
                </Box>
                <ValidatorForm autoComplete="off" onSubmit={props.handleSubmit}>
                  <Box
                    py={2}
                    sx={{
                      "& .MuiTextField-root": { my: 2 },
                    }}
                  >
                    <TextValidator
                      label="Enter 4 Digit OTP"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      variant="outlined"
                      inputProps={{ maxLength: 4 }}
                      name="otp"
                      fullWidth
                      validators={["required"]}
                      errorMessages={["OTP is required"]}
                      value={props.values.otp}
                    />
                    {/* <TextField
                      fullWidth
                      placeholder="Enter OTP code here"
                      value={props.values.otp}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      name="otp"
                      error={props.touched.otp && Boolean(props.errors.otp)}
                      helperText={props.touched.otp && props.errors.otp}
                      required
                    /> */}
                  </Box>
                  <Button
                    className="containedPrimary"
                    variant="contained"
                    sx={{ marginTop: "40px" }}
                    onClick={props.handleSubmit}
                  >
                    {loading || reLoading ? (
                      <ClipLoader size={25} color="white" loading />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                  <ToastContainer />
                </ValidatorForm>
                <Box
                  pt={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="text.secondary" variant="body">
                    Resend OTP in{" "}
                    <span>
                 
                      0{minutes}:{seconds}
                    </span>
                  </Typography>
                  
                </Box>
              </Box>
            </AuthLayout>
          </>
        )}
      </Formik>
    </>
  );
};

export default VerifyOtp;
