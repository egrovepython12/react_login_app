import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE
} from "../actions/user_actions";

function loginReducer(state = [], action)
{
  switch (action.type) 
  {
    case 'LOGIN_SUCCESS':
      state = action.payload;
      return state;

    case 'LOGIN_FAILURE':
      state = action.payload;
      return state;

  	default:
       return state;
   }
  return state
}

export default loginReducer