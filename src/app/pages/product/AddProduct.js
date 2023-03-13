/*import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton, Grid,Select,FormControl,InputLabel,MenuItem } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../shared/components/authLayout";
import { pharmacyLoginRequest } from "../../services/auth";
import { ClipLoader } from "react-spinners";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { v4 } from "uuid";
import PreviewImage from "../../modules/adminDashboard/profileSettings/PreviewImage";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { createPharmacyProduct, getProductCategory, getRootCategory, uploadProductImage } from "../../services/products";
import FErrorMessage from '../../shared/components/FErrorMessage'
const AddProduct = () => {
  const dispatch = useDispatch();
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  console.log(imageUpload, "Images>>");
  const productImageRef = useRef();
  const response = useSelector((state) => state?.auth?.pharmacyLogin?.response);
  const loading=useSelector((state)=>state?.product?.createPharmacyProduct.loading)
  const rootCategory=useSelector((state)=>state?.product?.rootCategory.response)
  const productCategory=useSelector((state)=>state?.product?.productCategory.response)
  console.log(rootCategory,"categories>>>>>")
  const pharmacyId = response?.data?.id;

useEffect(()=>{
 dispatch(getRootCategory(toast))
 dispatch(getProductCategory(toast))
},[dispatch])


  const navigate = useNavigate();
  const handleImageUpload = (e) => {
    for (let i = 0; i < e.target.files.length < 4; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = v4();
      setImageUpload((prevState) => [...prevState, newImage]);
    }
  };
  const uploadImageStorage = async () => {
    const imageRef = imageUpload.map((img) =>
      ref(storage, `images/${img.name + v4()}`)
    );
    console.log(imageRef.length, "Hello>>>>");
    console.log(imageUpload.length, "length>>>");
    const counter = 0;
    for (let i = 0; i < imageUpload.length; i++) {
      setImgLoading(true);
      console.log(counter[i], "Loop");
      const byte = await uploadBytes(imageRef[i], imageUpload[i]);
      setImgLoading(false);
      toast.success("Image succesfully uploaded");
      const url = await getDownloadURL(byte.ref);
      setImageUrls((prev) => [...prev, url]);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
            console.log(values,"Values onSubmit")
            debugger
            dispatch(createPharmacyProduct(values,pharmacyId,toast))

          //   const imageRef = imageUpload.map((img) =>
          //   ref(storage, `images/${img.name + v4()}`)
          // );

          // for (let i = 0; i < imageUpload.length; i++) {
          //   setImgLoading(true)
          //   const byte = await uploadBytes(imageRef[i], imageUpload[i]);
          //   setImgLoading(false)
          //   toast.success("Image succesfully uploaded")
          //   const url = await getDownloadURL(byte.ref);
          //   setImageUrls((prev) => [...prev, url]);
          // }
        //   dispatch(uploadProductImage(imageUrls, pharmacyId, toast));

        }}
        validationSchema={Schema}
      >
        {(props) => (
          <>
            {console.log(props.values, "Values>>>")}

            <Box>
              <Typography variant="h4" gutterBottom>
                Add Product
              </Typography>
            </Box>
            <form autoComplete="off" onSubmit={props.handleSubmit}>
              <Box
                py={2}
                sx={{
                  "& .MuiTextField-root": { my: 1 },
                }}
              >
                 <Grid item md={12}>
                    <TextField
                    fullWidth
                    placeholder="Product Name"
                    value={props.values.product_name}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="product_name"
                    error={props.touched.product_name && Boolean(props.errors.product_name)}
                    helperText={props.touched.product_name && props.errors.product_name}
                    required
                  />
                 <TextField
                    fullWidth
                    placeholder="Drug identification No"
                    value={props.values.din}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="din"
                    error={props.touched.din && Boolean(props.errors.din)}
                    helperText={props.touched.din && props.errors.din}
                    required
                  />
                <TextField
                    fullWidth
                    placeholder="Brand"
                    value={props.values.brand}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="brand"
                    error={props.touched.brand && Boolean(props.errors.brand)}
                    helperText={props.touched.brand && props.errors.brand}
                    required
                  />
                  <TextField
                    fullWidth
                    placeholder="Quantity"
                    value={props.values.quantity}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="quantity"
                    error={props.touched.quantity && Boolean(props.errors.quantity)}
                    helperText={props.touched.quantity && props.errors.quantity}
                    required
                  />
                <TextField
                    fullWidth
                    placeholder="Sub Brand"
                    value={props.values.sub_brand}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="sub_brand"
                    error={props.touched.sub_brand && Boolean(props.errors.sub_brand)}
                    helperText={props.touched.sub_brand && props.errors.sub_brand}
                    required
                  />
                  <TextField
                    fullWidth
                    placeholder="Form"
                    value={props.values.form}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="form"
                    error={props.touched.form && Boolean(props.errors.form)}
                    helperText={props.touched.form && props.errors.form}
                    required
                  />
                  <TextField
                    fullWidth
                    placeholder="Size"
                    value={props.values.size}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="size"
                    error={props.touched.size && Boolean(props.errors.size)}
                    helperText={props.touched.size && props.errors.size}
                    required
                  />
                   <TextField
                    fullWidth
                    placeholder="Price"
                    value={props.values.price}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="price"
                    error={props.touched.price && Boolean(props.errors.price)}
                    helperText={props.touched.price && props.errors.price}
                    required
                  />
                    {/!* <TextField
                    fullWidth
                    placeholder="Category Name"
                    value={props.values.category_name}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="category_name"
                    error={props.touched.category_name && Boolean(props.errors.category_name)}
                    helperText={props.touched.category_name && props.errors.category_name}
                    required
                  /> *!/}
                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>Category Name</InputLabel>
                    <Select
                      name="category_name"
                      // value={company_name}
                      value={props.values.category_name}
                      // onChange={(e) => companyHandleChange(e)}
                      onChange={props.handleChange}
                    //   onChange={(e)=>{
                    //      props.setFieldValue("category_name", e.target.value);
                    //   }}
                    >
                      {rootCategory?.data?.map((category) => {
                        return (
                          <MenuItem key={category?._id} value={category?.title}>
                            {category?.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FErrorMessage name="category_name"/>
                  </FormControl>

                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>Product Category Name</InputLabel>
                    <Select
                      name="product_category_name"
                      // value={company_name}
                      value={props.values.product_category_name}
                      // onChange={(e) => companyHandleChange(e)}
                      onChange={props.handleChange}
                    //   onChange={(e)=>{
                    //      props.setFieldValue("category_name", e.target.value);
                    //   }}
                    >
                      {productCategory?.data?.map((category) => {
                        return (
                          <MenuItem key={category?._id} value={category?.title}>
                            {category?.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FErrorMessage name="product_category_name"/>
                  </FormControl>

                     {/!* <TextField
                    fullWidth
                    placeholder="Product Category Name"
                    value={props.values.product_category_name}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="product_category_name"
                    error={props.touched.product_category_name && Boolean(props.errors.product_category_name)}
                    helperText={props.touched.product_category_name && props.errors.product_category_name}
                    required
                  /> *!/}
                   <TextField
                    fullWidth
                    placeholder="Fullfillment"
                    value={props.values.fullfillment}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="fullfillment"
                    error={props.touched.fullfillment && Boolean(props.errors.fullfillment)}
                    helperText={props.touched.fullfillment && props.errors.fullfillment}
                    required
                  />
                   <TextField
                    fullWidth
                    placeholder="Description"
                    value={props.values.description}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="description"
                    error={props.touched.description && Boolean(props.errors.description)}
                    helperText={props.touched.description && props.errors.description}
                    required
                  />
                  <TextField
                    fullWidth
                    placeholder="Payment"
                    value={props.values.payment}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="payment"
                    error={props.touched.payment && Boolean(props.errors.payment)}
                    helperText={props.touched.payment && props.errors.payment}
                    required
                  />
                  <TextField
                    fullWidth
                    type="date"
                    placeholder="Expiry Date"
                    value={props.values.expiry_date}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    name="expiry_date"
                    error={props.touched.expiry_date && Boolean(props.errors.expiry_date)}
                    helperText={props.touched.expiry_date && props.errors.expiry_date}
                    required
                  />
                    </Grid>
                {/!* <Grid item md={4}>
                  <Box
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

                        {props.values.product_image && (
                          <PreviewImage file={props.values.product_image} />
                        )}
                      </Box>
                  <input
                    type="file"
                    max="4"
                    multiple
                    // onChange={(e) => {
                    //   handleImageUpload(e),props.setFieldValue("product_image",imageUrls)
                    // }}
                    onChange={handleImageUpload}
                    ref={productImageRef}
                    accept=".jpg,.png,.jpeg"
                  />
                </Grid> *!/}

                {/!* <Grid item xs={6} md={6}>
                  <Button
                    sx={{ marginTop: "40px" }}
                    variant="outlined"
                    className="containedPrimary"
                    // onClick={() => productImageRef.current.click()}
                    onClick={uploadImageStorage}
                  >
                    {imgLoading ? (
                      <ClipLoader size={25} color="white" loading />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </Grid> *!/}
              </Box>

              <Button
                className="containedPrimary"
                variant="contained"
                sx={{ width: "100%" }}
                onClick={props.handleSubmit}
              >
                {loading ? (
                    <ClipLoader size={25} color="white" loading />
                  ) : (
                    "Add Product"
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
            ></Box>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddProduct;*/
import React, {useEffect, useState, useRef, useCallback} from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Add, Clear} from "@mui/icons-material";
import {Formik} from "formik";
import {dummyImages, Schema} from "./helper";
import {uploadVerificationDocsDetails} from "../../services/auth";
import {toast} from "react-toastify";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FErrorMessage from "../../shared/components/FErrorMessage";
import MenuItem from "@mui/material/MenuItem";
import {
    createPharmacyProduct,
    getProductCategory,
    getRootCategory,
    getProductByDin,
    addProduct,
    uploadProductImage,
    removeProductImage
} from "../../services/products";
import debounce from "lodash.debounce";
import {useDispatch, useSelector} from "react-redux";
import Select from "@mui/material/Select";
import PreviewImage from "../../modules/adminDashboard/profileSettings/PreviewImage";
import PreviewProductImage from "./PreviewImage";
import Divider from "@mui/material/Divider";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";


export const AddProduct = () => {
    const dispatch = useDispatch();
    const coverPictureRef = useRef(null);
    const onePictureRef = useRef(null);
    const twoPictureRef = useRef(null);
    const threePictureRef = useRef(null);
    const [initialValues, setInitialValues] = useState({
        product_name: '',
        quantity:'',
        description: '',
        brand: '',
        imageCover: {},
        category_name: "",
        product_category_name: "",
        batch_number:"",
        images: [{thumbnail:'',full_image:'',public_id:''},{thumbnail:'',full_image:'',public_id:''},{thumbnail:'',full_image:'',public_id:''}],
        PRODUCT_SIZE:'',
        PRODUCT_TYPE:'',
        price: '',
        payment: '',
        fullfillment: '',
        expiry_date: "",
        DRUG_CODE: '',
        PRODUCT_CATEGORIZATION: '',
        CLASS: '',
        DRUG_IDENTIFICATION_NUMBER: '',
        BRAND_NAME: '',
        DESCRIPTOR: '',
        ADDRESS_BILLING_FLAG: '',
        PEDIATRIC_FLAG: '',
        NUMBER_OF_AIS: '',
        LAST_UPDATE_DATE: '',
        AI_GROUP_NO: '',
        CLASS_F: '',
        BRAND_NAME_F: '',
        DESCRIPTOR_F: '',
        status: [],
        ingredients: [],
        form: [],
        companies: [],
        package: [],
        route: []
    })
    const [showNotExistText, setShowNotExistText] = useState(false)
    const [imageIndex,setImageIndex] = useState('')
    const {user} = useSelector(state => state?.auth);
    const navigate = useNavigate();
    const loading = useSelector((state) => state?.product?.uploadProductImage?.loading)
    const removeImageloading = useSelector((state) => state?.product?.removeProductImage?.loading)
    const addProductloading = useSelector((state) => state?.product?.addProduct?.loading)
    const rootCategory = useSelector((state) => state?.product?.rootCategory.response)
    const productCategory = useSelector((state) => state?.product?.productCategory.response)
    const productByDinResponse = useSelector(state => state?.product?.productByDIN?.response);
    const [imageLoading,setImageLoading] = useState(false);
    const pharmacyId = user?._id;



    useEffect(() => {
        dispatch(getRootCategory(toast))
        dispatch(getProductCategory(toast))
    }, [dispatch])


    const debouncedGetSearch = useCallback(debounce((query, props) => {
        dispatch(getProductByDin(query, function (res) {
            if (res && res?.data != null) {
                 let data = {...res.data}
                delete data._id
                delete data.__v
                   data.product_name = data?.BRAND_NAME
                data.product_category_name = data?.PRODUCT_CATEGORIZATION ? data?.PRODUCT_CATEGORIZATION  : 'other'
                data.PRODUCT_CATEGORIZATION = data?.PRODUCT_CATEGORIZATION ? data?.PRODUCT_CATEGORIZATION  : 'other'
                data.brand = data?.companies && data?.companies?.length ? data?.companies[0]?.COMPANY_NAME : ''
                props.setValues({...props.values,...data })
                setShowNotExistText(false)
            } else {
                props.setValues({...initialValues, DRUG_IDENTIFICATION_NUMBER: query})
                setShowNotExistText(true)
            }
        },function(err){
            if(err) {
                props.setValues({...initialValues, DRUG_IDENTIFICATION_NUMBER: query})
                setShowNotExistText(true)
            }

        }));
    }, 1000), []);

    const handleDrugIdentification = (e, props) => {
        debouncedGetSearch(e.target.value, props);
        props.setFieldValue('DRUG_IDENTIFICATION_NUMBER', e.target.value)
    };

    const fullFillmenyOptions = [
        { label: "Willing to drop-off/deliver", value: "Willing to drop-off/deliver" },
        { label: "Willing to ship the item", value: "Willing to ship the item" },
        { label: "offer curbside pickup", value: "offer curbside pickup" },

    ];

    const paymentOptions = [
        { label: "Offer cashless payment", value: "Offer cashless payment" },
        { label: "Cash Accepted", value: "Cash Accepted" },

    ];

    const handleImageUpload = (file,fieldName,props,index) => {

        setImageIndex(index)
        let formData = new FormData();
        formData.append('image',file)
        dispatch(uploadProductImage(formData,function (res){
             console.log(res)
            if(res){
                if(fieldName == 'imageCover'){
                    props.setFieldValue('imageCover',{...res?.data} )
                }else{

                    let images = [...props.values.images]
                    images[index] = res.data
                    props.setFieldValue('images',images )

                }
                setImageLoading(false)
            }

        }))


    }

    const handleRemoveImage  = (publicId,fieldName,index,props) => {

          if(publicId){
              setImageIndex(index)
              setImageLoading(true)
              let images = [props?.values?.images]
               dispatch(removeProductImage({imageName:publicId},function (res){


                       if(res){
                           if(fieldName == 'imageCover'){

                               props.setFieldValue('imageCover',{} )
                           }else{

                               let images = [...props.values.images]
                               images[index] = {thumbnail:'',full_image:'',public_id:''}
                               props.setFieldValue('images',images )

                           }
                           setImageLoading(false)
                       }

               }))

          }



    }

    const findImageIndex = (publicId,props) =>{
        if(publicId){

            let images = [...props.values.images]
            return images.findIndex((el)=>el.public_id == publicId)
        }else{

            return  -1
        }



    }


    let disabled = false
    return (
        <Card>
            <Typography variant="h5" component="div" sx={{paddingTop: "10px", paddingLeft: "15px", paddingBottom: "10px"}}>
                Add Product
            </Typography>
            <CardContent>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={Schema}
                    onSubmit={(values, {resetForm}) => {
                        console.log(values, "Values onSubmit")
                        values.pharmacy_id = pharmacyId
                        let data = {...values}
                        data.images = values.images.filter((el)=>el?.public_id?.length > 0)


                        dispatch(addProduct(data,function (res){
                                toast.success('Product created successfully')
                            navigate('/dash/products')

                        }))
                    }}


                >
                    {(props) => (

                        <form autoComplete="off" onSubmit={props.handleSubmit}>
                            <Grid alignItems="flex-start" spacing={4} container>
                                <Grid container direction="columns" item xs={10}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Drug identification No"
                                        value={props?.values?.DRUG_IDENTIFICATION_NUMBER}
                                        onBlur={props.handleBlur}
                                        onChange={(e) => handleDrugIdentification(e, props)}
                                        name="din"
                                        error={props.touched.DRUG_IDENTIFICATION_NUMBER && Boolean(props.errors.DRUG_IDENTIFICATION_NUMBER)}
                                        helperText={(props.touched.DRUG_IDENTIFICATION_NUMBER && props.errors.DRUG_IDENTIFICATION_NUMBER) || props?.values?.DRUG_IDENTIFICATION_NUMBER?.length && showNotExistText ? 'No Record Exists Against this DIN' : ''}
                                        required
                                    />
                                </Grid>
                                {console.log(props.errors)}
                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Product Name"
                                        value={props?.values?.product_name}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        name="product_name"
                                        disabled={disabled}
                                        error={props.touched.product_name && Boolean(props.errors.product_name)}
                                        helperText={props.touched.product_name && props.errors.product_name}
                                        required
                                    /></Grid>
                                {props?.values && props?.values?.DESCRIPTOR && props?.values?.DESCRIPTOR?.length > 0 &&
                                    < Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Descriptor"
                                    value={props.values.DESCRIPTOR}
                                    disabled={disabled}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    name="description"
                                    error={props.touched.DESCRIPTOR && Boolean(props.errors.DESCRIPTOR)}
                                    helperText={props.touched.DESCRIPTOR && props.errors.DESCRIPTOR}
                                    required
                                    /></Grid>
                                }

                                    < Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Product Categorization"
                                            value={props.values.PRODUCT_CATEGORIZATION}
                                            disabled={disabled}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="description"
                                            error={props.touched.PRODUCT_CATEGORIZATION && Boolean(props.errors.PRODUCT_CATEGORIZATION)}
                                            helperText={props.touched.PRODUCT_CATEGORIZATION && props.errors.PRODUCT_CATEGORIZATION}
                                            required
                                        /></Grid>


                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Drug Code"
                                        value={props.values.DRUG_CODE}
                                        disabled={disabled}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        name="description"
                                        error={props.touched.DRUG_CODE && Boolean(props.errors.DRUG_CODE)}
                                        helperText={props.touched.DRUG_CODE && props.errors.DRUG_CODE}
                                        required
                                    /></Grid>


                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Class"
                                        value={props.values.CLASS}
                                        disabled={disabled}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        name="description"
                                        error={props.touched.CLASS && Boolean(props.errors.CLASS)}
                                        helperText={props.touched.CLASS&& props.errors.CLASS}
                                        required
                                    /></Grid>


                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Product Category Name"
                                        value={props?.values?.product_category_name}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        disabled={disabled}
                                        name="description"
                                        error={props.touched.product_category_name&& Boolean(props.errors.product_category_name)}
                                        helperText={props.touched.product_category_name && props.errors.product_category_name}
                                        required
                                    /></Grid>


                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Brand"
                                        value={props?.values?.brand}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        disabled={disabled}
                                        name="description"
                                        error={props.touched.brand&& Boolean(props.errors.brand)}
                                        helperText={props.touched.brand && props.errors.brand}
                                        required
                                    /></Grid>


                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="AI_GROUP_NO"
                                        value={props.values.AI_GROUP_NO}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        disabled={disabled}
                                        name="description"
                                        error={props.touched.AI_GROUP_NO && Boolean(props.errors.AI_GROUP_NO)}
                                        helperText={props.touched.AI_GROUP_NO && props.errors.AI_GROUP_NO}
                                        required
                                    /></Grid>



                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Pediatric Flag"
                                        disabled={disabled}
                                        value={props.values.PEDIATRIC_FLAG}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        name="description"
                                        error={props.touched.PEDIATRIC_FLAG&& Boolean(props.errors.PEDIATRIC_FLAG)}
                                        helperText={props.touched.PEDIATRIC_FLAG && props.errors.PEDIATRIC_FLAG}
                                        required
                                    /></Grid>



                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="NUMBER_OF_AIS"
                                        value={props.values.NUMBER_OF_AIS}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        disabled={disabled}
                                        name="NUMBER_OF_AIS"
                                        error={props.touched.NUMBER_OF_AIS && Boolean(props.errors.NUMBER_OF_AIS)}
                                        helperText={props.touched.NUMBER_OF_AIS && props.errors.NUMBER_OF_AIS}
                                        required
                                    /></Grid>



                                {/*<Grid item xs={12} md={4} lg={3}>*/}
                                {/*    <TextField*/}
                                {/*        fullWidth*/}
                                {/*        variant="filled"*/}
                                {/*        label="Description"*/}
                                {/*        value={props.values.BRAND_NAME_F}*/}
                                {/*        onBlur={props.handleBlur}*/}
                                {/*        onChange={props.handleChange}*/}
                                {/*        name="description"*/}
                                {/*        error={props.touched.BRAND_NAME_F && Boolean(props.errors.BRAND_NAME_F)}*/}
                                {/*        helperText={props.touched.BRAND_NAME_F && props.errors.BRAND_NAME_F}*/}
                                {/*        required*/}
                                {/*    /></Grid>*/}
                            </Grid>

                                    {console.log('props.values',props.values)}

                            <Grid container mt={1} spacing={3}>

                                {props?.values && props?.values?.status && props?.values?.status?.length > 0 &&
                                    <Grid item xs={12} md={4} lg={3}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, background: "#fff", boxShadow: "0px 0px 11px 3px rgba(115, 102, 255, 0.12)"}}
                                            component="nav"
                                            aria-labelledby="Ingredients"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Status
                                                </ListSubheader>
                                            }
                                        >



                                                < ListItemText primary={`${props?.values?.status[0]?.CLASS} ${props?.values?.status[0]?.STATUS} `} sx={{paddingLeft: "15px"}}/>


                                        </List>
                                    </Grid>

                                }




                                {props?.values && props?.values?.ingredients && props?.values?.ingredients?.length > 0 &&
                                <Grid item xs={12} md={4} lg={3}>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, background: "#fff", boxShadow: "0px 0px 11px 3px rgba(115, 102, 255, 0.12)"}}
                                        component="nav"
                                        aria-labelledby="Ingredients"
                                        subheader={
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Ingredients
                                            </ListSubheader>
                                        }
                                    >
                                        {props?.values && props?.values?.ingredients && props?.values?.ingredients?.length > 0 && props?.values?.ingredients?.map((el)=>(


                                            < ListItemText primary={`${el?.INGREDIENT} ${el?.STRENGTH}${el?.STRENGTH_UNIT} `} sx={{paddingLeft: "15px"}}/>

                                            ))

                                        }
                                    </List>
                                </Grid>

                   }

                                {props?.values && props?.values?.form && props?.values?.form?.length > 0 &&
                                    <Grid item xs={12} md={4} lg={3}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, background: "#fff", boxShadow: "0px 0px 11px 3px rgba(115, 102, 255, 0.12)"}}
                                            component="nav"
                                            aria-labelledby="Ingredients"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Form
                                                </ListSubheader>
                                            }
                                        >
                                            {props?.values && props?.values?.form && props?.values?.form?.length > 0 && props?.values?.form?.map((el)=>(


                                                < ListItemText primary={`${el?.PHARMACEUTICAL_FORM} `} sx={{paddingLeft: "15px"}}/>

                                            ))

                                            }
                                        </List>
                                    </Grid>

                                }

                                {props?.values && props?.values?.route && props?.values?.route?.length > 0 &&
                                    <Grid item xs={12} md={4} lg={3}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, background: "#fff", boxShadow: "0px 0px 11px 3px rgba(115, 102, 255, 0.12)"}}
                                            component="nav"
                                            aria-labelledby="Ingredients"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Route
                                                </ListSubheader>
                                            }
                                        >
                                            {props?.values && props?.values?.route && props?.values?.route?.length > 0 && props?.values?.route?.map((el)=>(


                                                < ListItemText primary={`${el?.ROUTE_OF_ADMINISTRATION} `} sx={{paddingLeft: "15px"}}/>

                                            ))

                                            }
                                        </List>
                                    </Grid>

                                }


                                {props?.values && props?.values?.companies && props?.values?.companies?.length > 0 &&
                                    <Grid item xs={12} md={4} lg={3}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, background: "#fff", boxShadow: "0px 0px 11px 3px rgba(115, 102, 255, 0.12)"}}
                                            component="nav"
                                            aria-labelledby="Ingredients"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                  Companies
                                                </ListSubheader>
                                            }
                                        >
                                            {props?.values && props?.values?.route && props?.values?.companies?.length > 0 && props?.values?.companies?.map((el)=>(


                                                < ListItemText primary={`${el?.COMPANY_NAME} `} sx={{paddingLeft: "15px"}}/>

                                            ))

                                            }
                                        </List>
                                    </Grid>

                                }





                            </Grid>
                                <Grid container mt={3} spacing={3}>
                                <Grid item xs={12}>
                                    <Box className="txt-divider">
                                        <Typography variant="body">
                                            Product Information
                                        </Typography>
                                        <Divider/>
                                    </Box>
                                </Grid>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormControl fullWidth variant="filled" required>
                                            <InputLabel>Category Name</InputLabel>
                                            <Select
                                                name="category_name"
                                                value={props.values.category_name}
                                                onChange={props.handleChange}
                                            >
                                                {rootCategory?.data?.map((category) => {
                                                    return (
                                                        <MenuItem key={category?._id} value={category?.title}>
                                                            {category?.title}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            <FErrorMessage name="category_name"/>
                                        </FormControl></Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Description"
                                        value={props.values.description}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        name="description"
                                        error={props.touched.description && Boolean(props.errors.description)}
                                        helperText={props.touched.description && props.errors.description}
                                        required
                                    /></Grid>



                                    <Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Product Type"
                                            value={props.values.PRODUCT_TYPE}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="PRODUCT_TYPE"
                                            error={props.touched.PRODUCT_TYPE && Boolean(props.errors.PRODUCT_TYPE)}
                                            helperText={props.touched.PRODUCT_TYPE && props.errors.PRODUCT_TYPE}
                                            required
                                        /></Grid>


                                    <Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Product Size"
                                            value={props.values.PRODUCT_SIZE}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="PRODUCT_SIZE"
                                            error={props.touched.PRODUCT_SIZE && Boolean(props.errors.PRODUCT_SIZE)}
                                            helperText={props.touched.PRODUCT_SIZE && props.errors.PRODUCT_SIZE}
                                            required
                                        /></Grid>

                                    <Grid item xs={12} md={4} lg={3}>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Expiry Date"
                                                value={props.values.expiry_date}
                                                onChange={(newValue) => {
                                                    props.setFieldValue('expiry_date',newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params}  error={props.touched.expiry_date && Boolean(props.errors.expiry_date)}
                                                                                    helperText={props.touched.expiry_date && props.errors.expiry_date}
                                                                                    required />}
                                            />
                                        </LocalizationProvider>

                                    </Grid>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Batch Number"
                                            value={props.values.batch_number}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="batch_number"
                                            error={props.touched.batch_number && Boolean(props.errors.batch_number)}
                                            helperText={props.touched.batch_number && props.errors.batch_number}
                                            required
                                        />
                                    </Grid>


                                    <Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Quantity"
                                            value={props.values.quantity}
                                            type="number"
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="quantity"
                                            error={props.touched.quantity && Boolean(props.errors.quantity)}
                                            helperText={props.touched.quantity && props.errors.quantity}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} lg={3}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            label="Price"
                                            value={props.values.price}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            name="price"
                                            error={props.touched.price && Boolean(props.errors.price)}
                                            helperText={props.touched.price && props.errors.price}
                                            required
                                        />
                                    </Grid>





                            </Grid>

                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormControl
                                            required
                                            error={props.touched.fullfillment && Boolean(props.errors.fullfillment)}
                                            component="fieldset"
                                            sx={{ m: 3 }}
                                            variant="standard"
                                        >
                                            <FormLabel component="legend">FullFillment</FormLabel>
                                            <FormGroup>
                                                {fullFillmenyOptions.map((el)=>(

                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={props?.values?.fullfillment == el?.label} onChange={()=>props.setFieldValue('fullfillment',el?.value)}  name={el?.label} />
                                                        }
                                                        label={el?.label}
                                                    />


                                                ))}



                                            </FormGroup>
                                            {props.touched.fullfillment && props.errors.fullfillment &&
                                                < FormHelperText >{props.errors.fullfillment}</FormHelperText>
                                            }
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormControl
                                            required
                                            error={props.touched.payment && Boolean(props.errors.payment)}
                                            component="fieldset"
                                            sx={{ m: 3 }}
                                            variant="standard"
                                        >
                                            <FormLabel component="legend">Payment</FormLabel>
                                            <FormGroup>
                                                {paymentOptions.map((el)=>(

                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={props?.values?.payment == el?.label} onChange={()=>props.setFieldValue('payment',el?.value)}  name={el?.label} />
                                                        }
                                                        label={el?.label}
                                                    />


                                                ))}



                                            </FormGroup>
                                            {props.touched.payment && props.errors.payment &&
                                                < FormHelperText >{props.errors.payment}</FormHelperText>
                                            }
                                        </FormControl>

                                    </Grid>


                                </Grid>
                                <Grid container direction="columns" item xs={2}>
                                        <Box className="image-uploader">
                                            <Box className="txt-divider">
                                                <Typography variant="h6">
                                                    Upload Images
                                                </Typography>
                                            </Box>
                                            <Box
                                                className={props?.values?.imageCover && props?.values?.imageCover?.full_image  ? "image-upload-container cover" : "image-upload-container" }
                                                gutterBottom
                                                mb={1}
                                                mt={1}
                                            >

                                                <IconButton color="primary" aria-label="upload picture" component="label"
                                                            onClick={() => coverPictureRef.current.click()}
                                                            sx={{position: "absolute"}}>
                                                    {loading && imageIndex == '-1' ?
                                                        <CircularProgress/>

                                                        :
                                                        <AddPhotoAlternateOutlinedIcon sx={{fontSize: "40px", color: "#7366ff"}}/>
                                                    }

                                                </IconButton>

                                                {props?.values?.imageCover && props?.values?.imageCover?.full_image && (
                                                    <PreviewProductImage imgUrl={props?.values?.imageCover?.full_image}/>

                                                )}
                                                {props?.values?.imageCover && props?.values?.imageCover?.full_image &&
                                                    <IconButton onClick={()=>handleRemoveImage(props?.values?.imageCover?.public_id,'imageCover',-1,props)} aria-label="delete picture" sx={{
                                                        position: "absolute",
                                                        right: "0",
                                                        top: "0",
                                                        color: "red",
                                                        zIndex: "1",
                                                        padding: "3px"
                                                    }}>
                                                        <Clear/>
                                                    </IconButton>
                                                }
                                                <input
                                                    hidden
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(e)=>handleImageUpload(e?.target?.files[0],'imageCover',props,-1)}
                                                    ref={coverPictureRef}
                                                />

                                            </Box>
                                            {props?.errors  && props?.errors?.imageCover && props?.touched && props?.touched?.imageCover && props?.errors?.imageCover?.full_image &&
                                                <span>{props?.errors?.imageCover?.full_image}</span>

                                            }
                                            {props?.values?.images && props?.values?.images?.length > 0  && props?.values?.images?.map((el,index)=>(


                                                <Box
                                                    className={"image-upload-container"}
                                                    gutterBottom
                                                    mb={1}
                                                    mt={1}
                                                >

                                                    <IconButton color="primary" aria-label="upload cover picture" component="label"
                                                                onClick={() => index == 0 ? onePictureRef.current.click() : index == 1 ? twoPictureRef.current.click() : threePictureRef.current.click() }
                                                                sx={{position: "absolute"}}>
                                                        {(loading ||  removeImageloading)  && imageIndex == index ?
                                                            <CircularProgress/>

                                                            :
                                                            <AddPhotoAlternateOutlinedIcon sx={{fontSize: "40px", color: "#7366ff"}}/>
                                                        }
                                                    </IconButton>

                                                    {props?.values?.images && props?.values?.images.length > 0 && findImageIndex(el?.public_id,props) > -1  && (
                                                      <>


                                                        <PreviewProductImage key={index} imgUrl={props?.values?.images[findImageIndex(el?.public_id,props)]?.full_image}/>


                                                    <IconButton onClick={()=>handleRemoveImage(props?.values?.images[index]?.public_id,'index',index,props)} aria-label="delete picture" sx={{position: "absolute", right: "0", top: "0", color: "red", zIndex: "1", padding: "3px"}}>
                                                        <Clear />
                                                    </IconButton>
                                                      </>
                                                        )}
                                                    <input
                                                        hidden
                                                        accept="image/*"
                                                        type="file"
                                                        name
                                                        multiple
                                                        onChange={(e)=>handleImageUpload(e?.target?.files[0],'index',props,index)}
                                                        ref={index == 0 ? onePictureRef : index == 1 ? twoPictureRef : threePictureRef }
                                                    />
                                                </Box>

                                            ))}

                                                                                </Box>
                                </Grid>
                            </Grid>
                            <CardActions>
                                <Button className="containedPrimary" disabled={addProductloading} onClick={props.handleSubmit} variant="contained">
                                    {addProductloading ?
                                        <CircularProgress/>
                                        :

                                        'Save'

                                    }

                                    </Button>
                            </CardActions>
                        </form>


                    )}
                </Formik>
            </CardContent>

        </Card>
    )


}
export default AddProduct;