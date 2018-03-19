import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE
} from "../actions/user_actions";

function registerReducer(state = [], action)
{
  console.log(action,'payload data')

  switch (action.type) 
  {
    case 'REGISTER_SUCCESS':
      state = action.payload;
      return state;

    case 'REGISTER_FAILURE':
      state = action.payload;
      return state;

  	default:
       return state;
   }
  return state
}

export default registerReducer