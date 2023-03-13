import React, { useEffect } from "react";
import AuthLayout from "../../shared/components/authLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField,Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { getResetPasswordDetails, getUpdatePasswordDetails } from "../../services/auth";
import { ClipLoader } from "react-spinners";


const ResetPassword = () => {
    let params = useParams()
    const id=params?.id
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const loading = useSelector(
      (state) => state.auth.resetPassword.loading
    );
    const error=useSelector(state=>state.auth.resetPassword.error)
    
    useEffect(()=>{
      
    },[dispatch])
  return (
    <AuthLayout>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
    
          try {
        dispatch(getResetPasswordDetails(values,id,toast,navigate))
      
            resetForm();
          } catch (e) {
      
  
          }
        }}
        validationSchema={Schema}
      >
        {(props) => (
          <Box px={3} flex={1}>
            <Box pb={4}>
              <Typography variant="h4" gutterBottom>
              Reset Password
              </Typography>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                No worries, We'll send you password reset instruction on your
                email
              </Typography>
            </Box>
            <form autoComplete="off" onSubmit={props.handleSubmit}>
              <Box py={2}>
              
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="password"
                value={props.values.password}
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="password"
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
                variant="filled"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                value={props.values.confirmPassword}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                name="confirmPassword"
                error={
                  props.touched.confirmPassword && Boolean(props.errors.confirmPassword)
                }
                variant="filled"
                type="password"
                helperText={props.touched.confirmPassword && props.errors.confirmPassword}
                required
              />
            </Grid>
              </Box>
              <Button
                className="containedPrimary"
                variant="contained"
                sx={{ marginTop: "40px" }}
                onClick={props.handleSubmit}
              >
               {loading ? (
            <ClipLoader size={25} color="white" loading />
          ) : (
            "Reset Password"
          )}  
              </Button>
              <ToastContainer/>
            </form>
            <Box
              pt={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="text" onClick={() => navigate("/login",{replace:true})}>
                <ArrowBack /> Back to Login
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
