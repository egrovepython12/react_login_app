import {
	USERS_EDIT_SUCCESS,
  USERS_EDIT_FAILURE,
  USERS_DELETE_SUCCESS,
  USERS_DELETE_FAILURE,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE
} from "../actions/user_actions";

function get_single_user_detailReducer(state = [], action)
{
  switch (action.type) 
  {

    case 'USERS_EDIT_SUCCESS':
      state = action.payload;
      return state;

    case 'USERS_EDIT_FAILURE':
      state = action.payload;
      return state;

    case 'USERS_DELETE_SUCCESS':
      state = action.payload;
      return state;

    case 'USERS_DELETE_FAILURE':
      state = action.payload;
      return state;

    case 'USER_DETAIL_SUCCESS':
      state = action.payload;
      return state;

    case 'USER_DETAIL_FAILURE':
      state = action.payload;
      return state;

  	default:
       return state;
   }
  return state
}

export default get_single_user_detailReducer