import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Grid, IconButton } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import AuthLayout from "../../shared/components/authLayout";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ArrowBack } from "@mui/icons-material";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";


// import PhoneInput,{ isPossiblePhoneNumber } from 'react-phone-number-input'
import FErrorMessage from "../../shared/components/FErrorMessage";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/bootstrap.css";
// import 'react-phone-number-input/style.css'
import "./signUp.scss";
import { pharmacySignupDetails } from "../../services/auth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(
    (state) => state.auth.pharmacySignupDetails?.loading
  );
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownConfirmPassword = () => {
    event.preventDefault();
  };

  const handleSelect = async (value) => {
    debugger;
    let country = {};
    let city = {};
    let state = {};
    let postalCode = {};
    for (let i = 0; i < value.address_components.length; i++) {
      if (value.address_components[i].types.includes("locality")) {
        city.long_name = value.address_components[i].long_name;
        city.short_name = value.address_components[i].short_name;
      } else if (
        value.address_components[i].types.includes(
          "administrative_area_level_1"
        )
      ) {
        state.long_name = value.address_components[i].long_name;
        state.short_name = value.address_components[i].short_name;
      } else if (value.address_components[i].types.includes("country")) {
        country.long_name = value.address_components[i].long_name;
        country.short_name = value.address_components[i].short_name;
      } else if (value.address_components[i].types.includes("postal_code")) {
        postalCode.postcode = value.address_components[i].long_name;
      }
    }
    console.log({ country, city, state, postalCode }, "2321312312");
    setCity(city.long_name);
    setCountry(country.long_name);
    setProvince(state.long_name);
    setZipCode(postalCode.postcode);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          console.log(values.phone_number.slice(0, 2), "telePhoneee>>>>>");
          dispatch(
            pharmacySignupDetails(
              values,
              coordinates,
              country,
              province,
              city,
              zipCode,
              countryData,
              navigate,
              toast
            )
          );
        }}
        validationSchema={Schema}
      >
        {(props) => (
          <>
            {console.log(props.values, "Values>>>")}
            <AuthLayout>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Signup
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Nuxus Pharama Signup
                  </Typography>
                </Box>
                <form autoComplete="off" onSubmit={props.handleSubmit}>
                  <Box py={2}  sx={{
                    '& .MuiTextField-root': { my: 2 },
                  }}>
                      <TextField
                        fullWidth
                        placeholder="Pharmacy Name"
                        value={props.values.pharmacy_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="pharmacy_name"
                        error={
                          props.touched.pharmacy_name &&
                          Boolean(props.errors.pharmacy_name)
                        }
                        helperText={
                          props.touched.pharmacy_name &&
                          props.errors.pharmacy_name
                        }
                        required
                      />
                      <TextField
                        fullWidth
                        placeholder="Email"
                        value={props.values.email}
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        name="email"
                        error={
                          props.touched.email && Boolean(props.errors.email)
                        }
                        type="email"
                        helperText={props.touched.email && props.errors.email}
                        required
                      />

                      <Autocomplete
                        apiKey="AIzaSyDo5VoxC6mMlbcvlrGJzvWpr_4FxEk0jHE"
                        language="en"
                        options={{
                          types: "address",
                        }}
                        libraries="places"
                        onChange={(ad) => {
                          props.setFieldValue("location", ad.target.value);
                        }}
                        onPlaceSelected={(place) => {
                          console.log(place,"Places")
                          setCoordinates({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                          });
                          handleSelect(place);

                          props.setFieldValue(
                            "location",
                            place.formatted_address
                          );
                        }}
                        placeholder="Location"
                        style={{
                          width: "100%",
                          height: "55px",
                          padding: "10px",
                          color: "#333",
                          marginBottom: 30,
                          border: "1px solid rgba(115, 102, 255, 1)",
                        }}
                      />
                      <PhoneInput
                        international
                        country="ca"
                        preferredCountries={["ca"]}
                        excludeCountries={['us']}
                        disableInitialCountryGuess={false}
                        name="phone_number"
                        autoComplete="phone_number"
                        variant="filled"
                        onChange={(phone, country) => {
                          setCountryData(country);
                          props.setFieldValue("phone_number", phone);
                        }}
                        onBlur={props.handleBlur}
                        value={props?.values?.phone_number}
                        required
                        style={{
                          padding: "10px",
                          color: "#333",
                          border: "1px solid rgba(115, 102, 255, 1)",
                        }}
                        inputStyle={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          background: "none",
                        }}
                        buttonStyle={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          background: "none",
                        }}
                      >
                        {() => (
                          <TextField
                            fullWidth
                            label="Phone"
                            name="phone_number"
                            value={props.values.phone_number}
                            error={
                              props.touched.phone_number &&
                              Boolean(props.errors.phone_number)
                            }
                            required
                          />
                        )}
                      </PhoneInput>
                      <FErrorMessage name="phone_number" />
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="LandLine"
                        name="landline_number"
                        value={props.values.landline_number}
                        helperText={props.touched.landline_number && props.errors.landline_number}
                        onChange={props.handleChange}
                        error={
                          props.touched.landline_number &&
                          Boolean(props.errors.landline_number)
                        }
                        inputProps={{ maxlength: 10 }}
                        required
                      />
                      <TextField
                        fullWidth
                        placeholder="Password"
                        value={props.values.password}
                        type={showPassword ? "text" : "password"}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="password"
                        error={
                          props.touched.password &&
                          Boolean(props.errors.password)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                      <FErrorMessage name="password" />
                      <TextField
                        fullWidth
                        placeholder="Confirm Password"
                        value={props.values.confirmPassword}
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="confirmPassword"
                        error={
                          props.touched.confirmPassword &&
                          Boolean(props.errors.confirmPassword)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                      <FErrorMessage name="confirmPassword" />
                  </Box>
                  <Button
                      className="containedPrimary"
                    variant="contained"
                    sx={{width: "100%"}}
                    onClick={props.handleSubmit}
                  >
                    {loading ? (
                      <ClipLoader size={25} color="white" loading />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <ToastContainer />
                </form>
                <Box
                  pt={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="text.secondary" variant="body">
                   Already have an account?
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => navigate("/login", { replace: true })}
                  >
                   Login
                  </Button>
                </Box>
            </AuthLayout>
          </>
        )}
      </Formik>
    </>
  );
};

export default Signup;
