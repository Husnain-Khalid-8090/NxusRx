import { createAction, handleActions } from 'redux-actions';
import { _getStarshipDetails } from '~shared/httpService/api';
import ActionTypes from '~shared/constants/actionTypes';

const initialState = {
  starship_details: { loading: false, response: {}, hasError: false, error: {} },
};

export const getStarshipDetailsStart = createAction(ActionTypes.GET_STARSHIP_DETAILS);
export const getStarshipDetailsSuccess = createAction(ActionTypes.GET_STARSHIP_DETAILS_SUCCESS, response => response);
export const getStarshipDetailsError = createAction(ActionTypes.GET_STARSHIP_DETAILS_ERROR, error => error);

export const getStarshipDetails = (starshipId) => async(dispatch) => {
  try {
    dispatch(getStarshipDetailsStart());
    const response= await _getStarshipDetails(starshipId);
    dispatch(getStarshipDetailsSuccess(response));
  } catch (error) {
    dispatch(getStarshipDetailsError(error));
  }


};

const reducer = handleActions({
  
  //STARSHIP_DETAILS
  [ActionTypes.GET_STARSHIP_DETAILS]: (state) => ({
    ...state, starship_details: {
      ...state.starship_details,
      loading: true, hasError: false, error: {}
    }
  }),
  [ActionTypes.GET_STARSHIP_DETAILS_SUCCESS]: (state, action) => ({
    ...state,
    starship_details: {
      ...state.starship_details,
      response: action.payload, loading: false, hasError: false, error: {}
    }
  }),
  [ActionTypes.GET_STARSHIP_DETAILS_ERROR]: (state, action) => ({
    ...state,
    starship_details: {
      ...state.starship_details,
      error: action.payload, loading: false, hasError: true, response: {}
    }
  }),

}, initialState);

export default reducer;