import axios from "axios";
import { store } from "../../../redux/store";

/*global BASE_URL */
/*eslint no-undef: "error"*/

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 40000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

/**
 * api request interceptor
 * @param {Object} req request object
 * @returns
 */

const handleRequest = async (req) => {
  let token = (await store?.getState()?.auth?.user)
    ? store?.getState()?.auth?.user?.token
    : null;
  console.log("token", token);
  if (token != null || token != undefined) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
};

/**
 * api error interceptor
 * @param {Object} error error object
 * @returns
 */
const handleError = (error) => {
  let parsed_error = Object.assign({}, error);
  if (
    parsed_error.code == "ECONNABORTED" &&
    !parsed_error.config.__isRetryRequest
  ) {
    parsed_error.config.__isRetryRequest = true;
    return API.request(parsed_error.config);
  }
  return Promise.reject(parsed_error?.response?.data);
};

/**
 * api response interceptor
 * @param {Object} response response object
 * @returns
 */
const handleResponse = (response) => {
  return Promise.resolve(response.data);
};

API.interceptors.request.use(handleRequest);

API.interceptors.response.use(handleResponse, handleError);

export default API;
