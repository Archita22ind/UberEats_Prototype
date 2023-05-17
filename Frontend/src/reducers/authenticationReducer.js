import { reduxConstants } from "../constants/reduxConstants";

const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case reduxConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case reduxConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case reduxConstants.LOGIN_FAILURE:
      return {};
    case reduxConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
