import { createAction, handleActions } from "redux-actions";
import ActionTypes from "~shared/constants/actionTypes";
import {toast} from 'react-toastify';
import {
  _createPharmacyProductDetails,
  // _uploadProductImage,
  _getRootCategories,
  _getProductCategories,
  _getPharmacyProductList,
  _getPharmacyProduct,
  _addProduct,
  _getProductByDin,
  _uploadProductImage,
  _removeProductImage,
  _getLandingPageProducts,
} from "~shared/httpService/api";

const initialState = {
  createPharmacyProduct: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  // uploadProductImage: {
  //   loading: false,
  //   response: {},
  //   hasErrorr: false,
  //   error: {},
  // },
  rootCategory: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  productCategory: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  products: {loading: false, response: {}, hasError: false, error: {}},
  product: {loading: false, response: {}, hasError: false, error: {}},
  addProduct:{loading: false, response: {}, hasError: false, error: {}},
  productByDIN:{loading: false, response: {}, hasError: false, error: {}},
  uploadProductImage:{loading: false, response: {}, hasError: false, error: {}},
  removeProductImage:{loading: false, response: {}, hasError: false, error: {}},
  landingPageProducts: {loading: false, response: {}, hasError: false, error:{}}


};
/* Root Category  */
export const rootCategoryStart = createAction(ActionTypes.ROOT_CATEGORY_START);
export const rootCategorySuccess = createAction(
  ActionTypes.ROOT_CATEGORY_SUCCESS,
  (response) => response
);
export const rootCategoryError = createAction(
  ActionTypes.ROOT_CATEGORY_ERROR,
  (error) => error
);
export const getRootCategory = (toast) => async (dispatch) => {
  try {
    dispatch(rootCategoryStart());

    const response = await _getRootCategories();

    dispatch(rootCategorySuccess(response));
   
  } catch (error) {
    dispatch(rootCategoryError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

/* Product Category  */
export const productCategoryStart = createAction( ActionTypes.PRODUCT_CATEGORY_START);
export const productCategorySuccess = createAction( ActionTypes.PRODUCT_CATEGORY_SUCCESS, (response) => response);
export const productCategoryError = createAction(ActionTypes.PRODUCT_CATEGORY_ERROR, (error) => error);
export const getProductCategory = (toast) => async (dispatch) => {
  try {
    dispatch(productCategoryStart());

    const response = await _getProductCategories();

    dispatch(productCategorySuccess(response));
    // toast.success(response.message);
  } catch (error) {
    dispatch(productCategoryError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

/* Create Pharmacy  */
export const createPharmacyProductStart = createAction(
  ActionTypes.CREATE_PHARMACY_PRODUCT_START
);
export const createPharmacyProductSuccess = createAction(
  ActionTypes.CREATE_PHARMACY_PRODUCT_SUCCESS,
  (response) => response
);
export const createPharmacyProductError = createAction(
  ActionTypes.CREATE_PHARMACY_PRODUCT_ERROR,
  (error) => error
);
export const createPharmacyProduct =
  (values, pharmacyId, toast) => async (dispatch) => {
    const Obj = {
      product_name: values.product_name,
      drug_Indentification_number: values.din,
      brand: values.brand,
      quantity: values.quantity,
      sub_brand: values.sub_brand,
      form: values.form,
      size: values.size,
      price: values.price,
      category_name: values.category_name,
      product_category_name: values.product_category_name,
      description:values.description,
      pharmacy_id: pharmacyId,
      expiry_date: values.expiry_date,
      fullfillment: values.fullfillment,
      payment: values.payment,
    };

    try {
      dispatch(createPharmacyProductStart());

      const response = await _createPharmacyProductDetails(Obj);

      dispatch(createPharmacyProductSuccess(response));
      toast.success(response.message);
    } catch (error) {
      dispatch(createPharmacyProductError(error));
      if (error?.status.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

/* ADD PRODUCT IMAGE */
// export const uploadProductImageStart = createAction(
//   ActionTypes.UPLOAD_PRODUCT_IMAGE_START
// );
// export const uploadProductImageSuccess = createAction(
//   ActionTypes.UPLOAD_PRODUCT_IMAGE_SUCCESS,
//   (response) => response
// );
// export const uploadProductImageError = createAction(
//   ActionTypes.UPLOAD_PRODUCT_IMAGE_ERROR,
//   (error) => error
// );
// export const uploadProductImage =
//   (imageUrls, pharmacyId, toast) => async (dispatch) => {
//     const Obj = {
//       image: {
//         full_image: imageUrls,
//       },
//     };
//
//     try {
//       dispatch(uploadProductImageStart());
//
//       const response = await _uploadProductImage(Obj, pharmacyId);
//
//       dispatch(uploadProductImageSuccess(response));
//       toast.success(response.message);
//     } catch (error) {
//       dispatch(uploadProductImageError(error));
//       if (error?.status.length > 0) {
//         toast.error(error?.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };


export const getProductsPharmacyStart = createAction(ActionTypes.GET_PHARMACY_PRODUCTS_START);
export const getProductsPharmacySuccess = createAction(ActionTypes.GET_PHARMACY_PRODUCTS_SUCCESS, response => response);
export const getProductsPharmacyError = createAction(ActionTypes.GET_PHARMACY_PRODUCTS_ERROR, error => error);

export const getPharmacyProductList = (pharmacyId,search, status, page, limit, callback) => (dispatch) => {
  dispatch(getProductsPharmacyStart());
  return _getPharmacyProductList(pharmacyId,search, status, page, limit).then((response) => {

    dispatch(getProductsPharmacySuccess(response));
    if (response) {
      callback(response);
    }
  }).catch((error) => {
    dispatch(getProductsPharmacyError(error));
    if (error && error?.error) {
      toast.error(error?.message);
    } else {
      toast.error('Something went wrong');

    }

  });
};

export const getProductPharmacyStart = createAction(ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_START);
export const getProductPharmacySuccess = createAction(ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_SUCCESS, response => response);
export const getProductPharmacyError = createAction(ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_ERROR, error => error);

export const getPharmacyProduct = (id) => (dispatch) => {
  dispatch(getProductPharmacyStart());
  return _getPharmacyProduct(id).then((response) => {
    dispatch(getProductPharmacySuccess(response));
  }).catch((error) => {
    dispatch(getProductPharmacyError(error));
    if (error && error?.error) {
      toast.error(error?.message);
    } else {
      toast.error('Something went wrong');

    }

  });
};

export const getProductPharmacyByDINStart = createAction(ActionTypes.GET_PRODUCT_BY_DIN_START);
export const getProductPharmacyByDINSuccess = createAction(ActionTypes.GET_PRODUCT_BY_DIN_SUCCESS, response => response);
export const getProductPharmacyByDINError = createAction(ActionTypes.GET_PRODUCT_BY_DIN_ERROR, error => error);

export const getProductByDin = (din,callback,callbackError) => (dispatch) => {
  dispatch(getProductPharmacyByDINStart());
  return _getProductByDin(din).then((response) => {
    dispatch(getProductPharmacyByDINSuccess(response));
    if(response){
      callback(response)
    }
  }).catch((error) => {
    dispatch(getProductPharmacyByDINError(error));
    callbackError(error)
    if (error && error?.error) {

      // toast.error(error?.message);
    } else {
      // toast.error('Something went wrong');

    }

  });
};


export const addProductPharmacyStart = createAction(ActionTypes.ADD_PHARMACY_PRODUCT_START);
export const addProductPharmacySuccess = createAction(ActionTypes.ADD_PHARMACY_PRODUCT_SUCCESS, response => response);
export const addProductPharmacyError = createAction(ActionTypes.ADD_PHARMACY_PRODUCT_ERROR, error => error);

export const addProduct = (data, callback) => (dispatch) => {
  dispatch(addProductPharmacyStart());
  return _addProduct(data).then((response) => {
    dispatch(addProductPharmacySuccess(response));
    if (response) {
      callback(response);
    }
  }).catch((error) => {
    dispatch(addProductPharmacyError(error));
    if (error && error?.error) {

        toast.error(error?.message)

    } else {
      if(error.message && error?.message?.includes('Duplicate field value')){
        toast.error('Product already exists');
      }else if(error?.message){
        toast.error(error?.message)
      }
    }

  });
};


export const uploadProductImagePharmacyStart = createAction(ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_START);
export const uploadProductImagePharmacySuccess = createAction(ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_SUCCESS, response => response);
export const uploadProductImagePharmacyError = createAction(ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_ERROR, error => error);

export const uploadProductImage = (data, callback) => (dispatch) => {
  dispatch(uploadProductImagePharmacyStart());
  return _uploadProductImage(data).then((response) => {
    dispatch(uploadProductImagePharmacySuccess(response));
    if (response) {
      callback(response);
    }
  }).catch((error) => {
    dispatch(uploadProductImagePharmacyError(error));
    if (error && error?.error) {
      toast.error(error?.message);
    } else {
      toast.error('Something went wrong');

    }

  });
};


export const removeProductImagePharmacyStart = createAction(ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_START);
export const removeProductImagePharmacySuccess = createAction(ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_SUCCESS, response => response);
export const removeProductImagePharmacyError = createAction(ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_ERROR, error => error);

export const removeProductImage = (data, callback) => (dispatch) => {
  dispatch(removeProductImagePharmacyStart());
  return _removeProductImage(data).then((response) => {
    dispatch(removeProductImagePharmacySuccess(response));
    if (response) {
      callback(response);
    }
  }).catch((error) => {
    dispatch(removeProductImagePharmacyError(error));

    console.log(error)
    if (error && error?.error) {
      toast.error(error?.message);
    } else {
      toast.error('Something went wrong');

    }

  });
};

/* Landing Page Cover Products  */
export const getPharmacyCoverProductsStart = createAction(
  ActionTypes.GET_COVER_PRODUCTS_START
);
export const getPharmacyCoverProductsSuccess = createAction(
  ActionTypes.GET_COVER_PRODUCTS_SUCCESS,
  (response) => response
);
export const getPharmacyCoverProductsError = createAction(
  ActionTypes.GET_COVER_PRODUCTS_ERROR,
  (error) => error
);
export const getPharmacyLandingProducts =() => async (dispatch) => {
 
    try {
      dispatch(getPharmacyCoverProductsStart());
    const response= await _getLandingPageProducts()
    console.log(response,"Response")
    dispatch(getPharmacyCoverProductsSuccess(response));
      
    } catch (error) {
      console.log(error,"Error>>>")
      dispatch(getPharmacyCoverProductsError(error));
      if (error?.status.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
const reducer = handleActions(
  {
    //Theme settings
    [ActionTypes.ROOT_CATEGORY_START]: (state) => ({
      ...state,
      rootCategory: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ROOT_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      rootCategory: {
        ...state.rootCategory,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ROOT_CATEGORY_ERROR]: (state, action) => ({
      ...state,
      rootCategory: {
        ...state.rootCategory,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.PRODUCT_CATEGORY_START]: (state) => ({
      ...state,
      productCategory: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.PRODUCT_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      productCategory: {
        ...state.productCategory,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.PRODUCT_CATEGORY_ERROR]: (state, action) => ({
      ...state,
      productCategory: {
        ...state.productCategory,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.CREATE_PHARMACY_PRODUCT_START]: (state) => ({
      ...state,
      createPharmacyProduct: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.CREATE_PHARMACY_PRODUCT_SUCCESS]: (state, action) => ({
      ...state,
      createPharmacyProduct: {
        ...state.createPharmacyProduct,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.CREATE_PHARMACY_PRODUCT_ERROR]: (state, action) => ({
      ...state,
      createPharmacyProduct: {
        ...state.createPharmacyProduct,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.UPLOAD_PRODUCT_IMAGE_START]: (state) => ({
      ...state,
      uploadProductImage: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPLOAD_PRODUCT_IMAGE_SUCCESS]: (state, action) => ({
      ...state,
      uploadProductImage: {
        ...state.uploadProductImage,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPLOAD_PRODUCT_IMAGE_ERROR]: (state, action) => ({
      ...state,
      uploadProductImage: {
        ...state.uploadProductImage,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    //PRODUCTS
    [ActionTypes.GET_PHARMACY_PRODUCTS_START]: (state) => ({
      ...state,
      products: {
        ...state.products,
        loading: true, hasError: false, error: {}

      }
    }),
    [ActionTypes.GET_PHARMACY_PRODUCTS_SUCCESS]: (state, action) => ({
      ...state,
      products: {
        ...state.products,
        loading: false, hasError: false, error: {}, response: action.payload?.data
      }
    }),
    [ActionTypes.GET_PHARMACY_PRODUCTS_ERROR]: (state) => ({
      ...state,
      products: {
        ...state.products,
        loading: false, hasError: false, error: {}, response: {}
      }
    }),

//PRODUCT DETAIL
      [ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_START]: (state) => ({
        ...state,
        product: {
          ...state.product,
          loading: true, hasError: false, error: {}, response: {}
        }
      }),
      [ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_SUCCESS]: (state, action) => ({
        ...state,

        product: {
          ...state.product,
          loading: false, hasError: false, error: {}, response: action.payload?.data
        }
      }),
      [ActionTypes.GET_PHARMACY_PRODUCT_DETAIL_ERROR]: (state) => ({
        ...state,

        product: {
          ...state.product,
          loading: false, hasError: false, error: {}, response: {}
        }
      }),


      //PRODUCT BY DIN
      [ActionTypes.GET_PRODUCT_BY_DIN_START]: (state) => ({
        ...state,
        productByDIN: {
          ...state.productByDIN,
          loading: true, hasError: false, error: {}, response: {}
        }
      }),
      [ActionTypes.GET_PRODUCT_BY_DIN_SUCCESS]: (state, action) => ({
        ...state,

        productByDIN: {
          ...state.productByDIN,
          loading: false, hasError: false, error: {}, response: action.payload?.data
        }
      }),
      [ActionTypes.GET_PRODUCT_BY_DIN_ERROR]: (state) => ({
        ...state,

        productByDIN: {
          ...state.productByDIN,
          loading: false, hasError: false, error: {}, response: {}
        }
      }),

      //ADD PRODUCT
      [ActionTypes.ADD_PHARMACY_PRODUCT_START]: (state) => ({
        ...state,
        addProduct: {
          ...state.addProduct,
          loading: true, hasError: false, error: {}, response: {}
        }
      }),
      [ActionTypes.ADD_PHARMACY_PRODUCT_SUCCESS]: (state, action) => ({
        ...state,

        addProduct: {
          ...state.addProduct,
          loading: false, hasError: false, error: {}, response: action.payload?.data
        }
      }),
      [ActionTypes.ADD_PHARMACY_PRODUCT_ERROR]: (state) => ({
        ...state,

        addProduct: {
          ...state.addProduct,
          loading: false, hasError: false, error: {}, response: {}
        }
      }),


      //UPLOAD PRODUCT IMAGE
      [ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_START]: (state) => ({
        ...state,
        uploadProductImage: {
          ...state.uploadProductImage,
          loading: true, hasError: false, error: {}, response: {}
        }
      }),
      [ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_SUCCESS]: (state, action) => ({
        ...state,

        uploadProductImage: {
          ...state.uploadProductImage,
          loading: false, hasError: false, error: {}, response: action.payload?.data
        }
      }),
      [ActionTypes.UPLOAD_PHARMACY_PRODUCT_IMAGE_ERROR]: (state) => ({
        ...state,

        uploadProductImage: {
          ...state.uploadProductImage,
          loading: false, hasError: false, error: {}, response: {}
        }
      }),


      //REMOVE PRODUCT IMAGE
      [ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_START]: (state) => ({
        ...state,
        removeProductImage: {
          ...state.removeProductImage,
          loading: true, hasError: false, error: {}, response: {}
        }
      }),
      [ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_SUCCESS]: (state, action) => ({
        ...state,

        removeProductImage: {
          ...state.removeProductImage,
          loading: false, hasError: false, error: {}, response: action.payload?.data
        }
      }),
      [ActionTypes.REMOVE_PHARMACY_PRODUCT_IMAGE_ERROR]: (state) => ({
        ...state,

        removeProductImage: {
          ...state.removeProductImage,
          loading: false, hasError: false, error: {}, response: {}
        }
      }),

 //  LANDING PAGE PRODUCTS
 [ActionTypes.GET_COVER_PRODUCTS_START]: (state) => ({
  ...state,
  landingPageProducts: {
    loading: true,
    response: {},
    hasError: false,
    error: {},
  },
}),

[ActionTypes.GET_COVER_PRODUCTS_SUCCESS]: (state, action) => ({
  ...state,
  landingPageProducts: {
    ...state.landingPageProducts,
    response: action.payload,
    loading: false,
    hasError: false,
    error: {},
  },
}),
[ActionTypes.GET_COVER_PRODUCTS_ERROR]: (state, action) => ({
  ...state,
  landingPageProducts: {
    ...state.landingPageProducts,
    error: action.payload,
    loading: false,
    hasError: true,
    response: {},
  },
}),


    },
  initialState
);

export default reducer;
