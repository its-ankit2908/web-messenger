import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import userReducers from "./user.reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducers,
});

export default rootReducer;