import {
	USERSLIST_SUCCESS,
	USERSLIST_FAILURE
} from "../actions/user_actions";


function usersReducer(state =[], action)
{
  switch (action.type) 
  {
    case 'USERSLIST_SUCCESS':
      state = action.payload
      return state;

    case 'USERSLIST_FAILURE':
      state = action.payload
      return state;

  	default:
       return state;
   }
  return state
}

export default usersReducer