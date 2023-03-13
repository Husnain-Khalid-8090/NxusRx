import store from '../../redux/store'
export function findURLParam(key, location) {
  let param,
    params_arr = [],
    queryString = location.indexOf("?") !== -1 ? location.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        return params_arr[i];
      }
    }
  }
}
// export const isLogin = async() => {
//   let token =await  (store?.getState()?.auth?.user)
//   ? store?.getState()?.auth?.user?.token
//   : null;
//   console.log(token,"isLoginFuncc")
//   if (token != null || token != undefined) {
//       return true;
//   }
//   return false;
// }
export const isLogin = () => {
  if (localStorage.getItem('token')) {
      return true;
  }
  return false;
}
