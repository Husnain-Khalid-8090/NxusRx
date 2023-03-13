import { createAction, handleActions } from "redux-actions";
import ActionTypes from "~shared/constants/actionTypes";
import dashboard, {
  _getAdminCompanies,
  _updateAdminCompaniesStatus,
  _getAdminCompanyUsers,
  _updateAdminCompanyUsersStatus,
} from "~shared/httpService/api";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  adminCompanies: { loading: false, response: {}, hasError: false, error: {} },
  adminUpadteCompanyStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  adminCompanyUsers: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  adminUpdateCompanyUsersStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
};

export const adminCompaniesStart = createAction(
  ActionTypes.ADMIN_COMPANIES_START
);
export const adminCompaniesSuccess = createAction(
  ActionTypes.ADMIN_COMPANIES_SUCCESS,
  (response) => response
);
export const adminCompaniesError = createAction(
  ActionTypes.ADMIN_COMPANIES_ERROR,
  (error) => error
);

export const getAdminCompanies = (page, search, status) => (dispatch) => {
  dispatch(adminCompaniesStart());

  return _getAdminCompanies(page, search, status)
    .then((response) => {
      dispatch(adminCompaniesSuccess(response));
    })
    .catch((error) => {
      dispatch(adminCompaniesError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const adminUpdateCompaniesStatusStart = createAction(
  ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_START
);
export const adminUpdateCompaniesStatusSuccess = createAction(
  ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_SUCCESS,
  (response) => response
);
export const adminUpdateCompaniesStatusError = createAction(
  ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_ERROR,
  (error) => error
);

export const updateAdminCompaniesStatus = (data, callback) => (dispatch) => {
  dispatch(adminUpdateCompaniesStatusStart());

  return _updateAdminCompaniesStatus(data)
    .then((response) => {
      dispatch(adminUpdateCompaniesStatusSuccess(response));
      if (response) {
        callback(response);
      }
    })
    .catch((error) => {
      dispatch(adminUpdateCompaniesStatusError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    });
};
/*    Admin Company Users   */

export const adminCompanyUsersStart = createAction(
  ActionTypes.ADMIN_COMPANY_USERS_START
);
export const adminCompanyUsersSuccess = createAction(
  ActionTypes.ADMIN_COMPANY_USERS_SUCCESS,
  (response) => response
);
export const adminCompanyUsersError = createAction(
  ActionTypes.ADMIN_COMPANY_USERS_ERROR,
  (error) => error
);

export const getAdminCompanyUsers =
  (companyId, page, search, status) => async (dispatch) => {
    try {
      dispatch(adminCompanyUsersStart());
      const response = await _getAdminCompanyUsers(
        companyId,
        page,
        search,
        status
      );
      dispatch(adminCompanyUsersSuccess(response));
    } catch (error) {
      dispatch(adminCompanyUsersError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

export const adminUpdateCompanyUserStatusStart = createAction(
  ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_START
);
export const adminUpdateCompanyUserStatusSuccess = createAction(
  ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_SUCCESS,
  (response) => response
);
export const adminUpdateCompanyUserStatusError = createAction(
  ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_ERROR,
  (error) => error
);

export const updateAdminCompanyUserStatus =
  (data, callback) => async (dispatch) => {
    try {
      dispatch(adminUpdateCompanyUserStatusStart());
      const response = await _updateAdminCompanyUsersStatus(data);
      dispatch(adminUpdateCompanyUserStatusSuccess(response));
      if (response) {
        callback(response);
      }
    } catch (error) {
      dispatch(adminUpdateCompanyUserStatusError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

const reducer = handleActions(
  {
    //Theme settings
    [ActionTypes.ADMIN_COMPANIES_START]: (state) => ({
      ...state,
      adminCompanies: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANIES_SUCCESS]: (state, action) => ({
      ...state,
      adminCompanies: {
        ...state.adminCompanies,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANIES_ERROR]: (state, action) => ({
      ...state,
      adminCompanies: {
        ...state.adminCompanies,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_START]: (state) => ({
      ...state,
      adminUpadteCompanyStatus: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_SUCCESS]: (
      state,
      action
    ) => ({
      ...state,
      adminUpadteCompanyStatus: {
        ...state.theme,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANIES_UPDATE_COMPANY_STATUS_ERROR]: (
      state,
      action
    ) => ({
      ...state,
      adminUpadteCompanyStatus: {
        ...state.adminUpadteCompanyStatus,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.ADMIN_COMPANY_USERS_START]: (state) => ({
      ...state,
      adminCompanyUsers: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANY_USERS_SUCCESS]: (state, action) => ({
      ...state,
      adminCompanyUsers: {
        ...state.adminCompanyUsers,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANY_USERS_ERROR]: (state, action) => ({
      ...state,
      adminCompanyUsers: {
        ...state.adminCompanyUsers,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_START]: (state) => ({
      ...state,
      adminUpdateCompanyUsersStatus: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_SUCCESS]: (
      state,
      action
    ) => ({
      ...state,
      adminUpdateCompanyUsersStatus: {
        ...state.adminUpdateCompanyUsersStatus,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.ADMIN_COMPANY_UPDATE_USER_STATUS_ERROR]: (state, action) => ({
      ...state,
      adminUpdateCompanyUsersStatus: {
        ...state.adminUpdateCompanyUsersStatus,
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
