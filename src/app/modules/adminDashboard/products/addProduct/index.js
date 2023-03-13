import React, {useRef} from "react";
import "./addProduct.scss";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PreviewImage from "../../profileSettings/PreviewImage";
import IconButton from "@mui/material/IconButton";
import {Add} from "@mui/icons-material";
import {Formik} from "formik";
import {initialValues, Schema} from "../../../../pages/verifyDocument/helper";
import {uploadVerificationDocsDetails} from "../../../../services/auth";
import {toast} from "react-toastify";
import AuthLayout from "../../../../shared/components/authLayout";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import avataar from "../../../../assets/images/avatar.png"
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";


export const AddProduct = () => {

    const frontPictureRef = useRef(null);
    const pharmacyId = location?.state?.pharmacyId;

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Add Product
                </Typography>

                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={8}
                          >
                        <Box sx={{display: "flex", flexWrap: "wrap", '& .MuiTextField-root': {width: "calc(100% - 20px)", my: 2},}}>
                        <Grid item xs={12} md={4}><TextField id="filled-basic" label="Product Name" variant="filled"/></Grid>
                        <Grid item xs={12} md={4}><TextField id="filled-basic" label="Description" variant="filled"/></Grid>
                        <Grid item xs={12} md={4}><TextField id="filled-basic" label="Category" variant="filled"/></Grid>
                        <Grid item xs={12} md={4}><TextField id="filled-basic" label="Category" variant="filled"/></Grid>
                            <Grid item xs={12} md={4}><TextField id="filled-basic" label="Description" variant="filled"/></Grid>
                            <Grid item xs={12} md={4}><FormControl variant="filled">
                                <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                                <FilledInput
                                    id="filled-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl></Grid>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize={true}
                            onSubmit={(values, { resetForm }) => {
                                dispatch(uploadVerificationDocsDetails(values, pharmacyId, toast));
                            }}
                            validationSchema={Schema}
                        >
                            {(props) => (
                                <form autoComplete="off" onSubmit={props.handleSubmit}>
                        <Typography variant="body">
                            Upload Images
                        </Typography>
                        <Typography color="text.secondary" variant="body2" gutterBottom>
                            Maximum 4 Pictures allowed
                        </Typography>
                        <Box
                            className={"image-upload-container"}
                            gutterBottom
                            mb={3}
                        >

                            <IconButton color="primary" aria-label="upload picture" component="label"
                                        onClick={() => frontPictureRef.current.click()}>
                                <Add/>
                            </IconButton>

                            {props.values.front_picture && (
                                <PreviewImage file={props.values.front_picture}/>
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
                                    <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164}>
                                            <ImageListItem className="upload-img-item" sx={{flexDirection: "row" }}>
                                                <img
                                                    src={avataar}
                                                    loading="lazy"
                                                /> <img
                                                src={avataar}
                                                loading="lazy"
                                            /> <img
                                                src={avataar}
                                                loading="lazy"
                                            /> <img
                                                src={avataar}
                                                loading="lazy"
                                            />
                                            </ImageListItem>
                                    </ImageList>
                                </form>
                                )}
                                </Formik>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button className="containedPrimary" variant="contained">Save</Button>
            </CardActions>
        </Card>
    )


}
export default AddProduct;