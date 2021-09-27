import { authConstants } from "../actions/constants";

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  uid: "",
  authenticating: false,
  authenticate: false,
  loading: false,
  message: "",
  error: "",
};

export default (state = initState, action) => {
 
   console.log(action);

  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      state = { ...state, loading: true, authenticating: true };
      break;
    case authConstants.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        ...action.payload.user,
        authenticating: false,
        authenticate: true,
        loading: false,
        message: "LoggedIn Successfully",
      };
      break;
    case authConstants.USER_LOGIN_FAILURE:
      state = {
        ...state,
        loading: false,
        authenticate: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case authConstants.USER_LOGOUT_REQUEST:
      break;
    case authConstants.USER_LOGOUT_SUCCESS:
      state = { ...initState }
      break;
    case authConstants.USER_LOGOUT_FAILURE:
      state={ ...state,error:action.payload.error }
      break;
  }

  return state;
};
