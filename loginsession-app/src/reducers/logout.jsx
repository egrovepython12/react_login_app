import {
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE
} from "../actions/user_actions";

function logoutReducer(state = [], action)
{
  switch (action.type) 
  {
    case 'LOGOUT_SUCCESS':
      return state;

    case 'LOGOUT_FAILURE':
      return state;

  	default:
       return state;
   }
  return state
}

export default logoutReducer