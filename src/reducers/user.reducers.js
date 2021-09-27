import { userConstants } from "../actions/constants";

const initState = {
    users:[],
    conversations:[],
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_REALTIME_USERS_REQUEST:
      break;
    case userConstants.GET_REALTIME_USERS_SUCCESS:
        state={
            ...state,
            users:action.payload.users,
        }
      break;
    case userConstants.GET_REALTIME_USERS_FAILURE:
        state={...initState}
      break;
    case userConstants.GET_REALTIME_MESSAGES:
      state = {
        ...state,
        conversations:action.payload.conversations,
      }
      break;
      case `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`:
        state = {
          ...state,
          conversations:[],
        }
        break;
    
    
  }

  return state;
};
