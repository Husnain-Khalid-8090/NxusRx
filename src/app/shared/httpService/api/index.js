import API from "../config";
import URLS from "../../constants/urls";

/**
 * get starship details
 *
 * @param {Number} starshipId starship ID
 * @returns api response
 */
export const _getStarshipDetails = (starshipId) => {
  return API.get(`${URLS.GET_STARSHIP_DETAILS}${starshipId}/`);
};
export const _signIn_QR = (data) => {

  return API.post(`${URLS.USER_LOGIN_QR}`, data);
};

export const _userSignUpDetails = (data) => {

  return API.post(`${URLS.USER_SIGNUP_DETAILS}`, data);
};
export const _pharmacyLoginDetails = (data) => {
  return API.post(`${URLS.PHARMACY_LOGIN}`, data);
};
export const _uploadVerificationDocsDetails=(formdata,is_reuploaded)=>{
  let url = `${URLS.UPLOAD_VERIFICATION_DOCUMENT}`
  if(is_reuploaded){
    url = '/pharmacy/auth/re-uploadVerificationDocs'
  }
  return API.post(`${url}`,formdata)
}

export const _pharmacySignUpDetails = (data) => {
  
  return API.post(`${URLS.PHARMACY_SIGNUP_DETAILS}`, data);
};
export const _pharmacyVerifyOtp = (data) => {
  return API.post(`${URLS.PHARMACY_VERIFY_OTP}`, data);
};
export const _resendPharmacyVerifyOtp = (data) => {
  return API.post(`${URLS.PHARMACY_RESEND_VERIFY_OTP}`, data);
};

export const _createPharmacyProductDetails = (data) => {
  return API.post(`${URLS.CREATE_PHARMACY_PRODUCT}`, data);
};
// export const _uploadProductImage=(obj)=>{
//   return API.patch(`${URLS.UPLOAD_PRODUCT_IMAGE}`,obj)
// }
export const _getRootCategories=()=>{
  return API.get(`${URLS.ROOT_CATEGORY}`)
}
export const _getProductCategories=()=>{
  return API.get(`${URLS.PRODUCT_CATEGORY}`)
}
// export const _getEmailVerificationDetails = (id, string) => {
//   return API.get(`${URLS.EMAIL_VERIFICATION_REQUEST}${id}/${string}`);
// };
export const _getForgotPasswordDetails = (email) => {
  return API.post(`${URLS.FORGOT_PASSWORD_REQUEST}`, email);
};
export const _getResetPasswordDetails = (data,id) => {
  return API.patch(`${URLS.RESET_PASSWORD_REQUEST}${id}`, data);
};
export const _getUpdatePasswordDetails = (data) => {
  return API.patch(`${URLS.UPDATE_PASSWORD_REQUEST}`, data);
};
export const _getUpdateProfileDetails = (data) => {
  return API.patch(`${URLS.PHARMACY_PROFILE_REQUEST}`, data);
};

export const _resendQR = (body) => {
  return API.post(`${URLS.RESEND_QR}`, body, {timeout: 8000});
};


export const _getLandingPageProducts=()=>{

  return API.get(`${URLS.GET_PHARMACY_PRODUCTS}`)
}
export const _getPharmacyProductList = async (pharmacyId,search, status, page, limit = 10) => {
  let url = `${URLS.PRODUCTS}/pharmacy/${pharmacyId}/?page=${page ? page : ''}&limit=${limit ? limit : ''}`;
  if (search) {
    url += `&search=${search ? search : ''}`;
  }
  if (status) {
    url += `&status=${status ? status : ''}`;
  }
  return API.get(`${url}`, {timeout: 20000});
};


export const _getPharmacyProduct = (id) => {
  return API.get(`${URLS.PRODUCTS}/${id}`, {timeout: 20000});
};

export const _addProduct = (data) => {
  return API.post(`${URLS.PRODUCTS}`, data);
};

export const _getProductByDin = (din) => {
  return API.get(`${URLS.PRODUCTS}/qrmy-product/${din}`, {timeout: 20000});
};

export const _uploadProductImage = (data) => {
  return API.post(`${URLS.PRODUCTS}/upload-product-image`, data);
};

export const _removeProductImage = (data) => {
  return API.post(`${URLS.PRODUCTS}/remove-product-image`, data);
};