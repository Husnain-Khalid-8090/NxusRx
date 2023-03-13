import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';

import auth from "../../services/auth";
import product from '../../services/products'
import  dash from '../../services/admin-dashboard'
import { clearCookie, getCookie, setCookie } from '../../helpers/common';

/**
 * all available reducers are wrapped by the combine reducers function
 */

const rootReducer = combineReducers({
  product,
  auth:dash,

});

const appReducer = (state, action) => {


  if (action.type === 'USER_LOGOUT') {
    
    storage.removeItem('persist:root')
    storage.removeItem('persist:DATA_PERSISTANT_KEY')
    clearCookie('dash_allowed_pages');
    state = undefined
  }

  return rootReducer(state, action)
}

export default appReducer;
