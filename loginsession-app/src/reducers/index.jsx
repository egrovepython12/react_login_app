import { combineReducers } from "redux";
import loginReducer from './login';
import logoutReducer from './logout';
import usersReducer from'./users';
import get_single_user_detailReducer from './singleuser';
import registerReducer from './register';

const rootReducer = combineReducers({
   usersReducer:usersReducer,
   loginReducer:loginReducer,
   logoutReducer:logoutReducer,
   singleuserReducer:get_single_user_detailReducer,
   registerReducer:registerReducer
   })


export default rootReducer;
