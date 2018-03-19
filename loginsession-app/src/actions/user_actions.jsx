import './action_constants';
import toastr from 'toastr';

export function LoginSuccess(bool,data) {
    return {
        type: 'LOGIN_SUCCESS',
        payload:{
            "isloggedin":bool,
            data
        }       
    };
}

export function LoginFailure(bool) {
    return {
        type: 'LOGIN_FAILURE',
        payload:{
            "isloggedin":bool
        }
        
    };
}

export function Logoutsuccess(bool) {
    return {
        type: 'LOGOUT_SUCCESS',
        payload:{
            "islogout":bool
        }
        
    };
}

export function Logoutfailure(bool) {
    return {
        type: 'LOGOUT_FAILURE',
        payload:{
            "islogout":bool
        }
        
    };
}

export function Userseditsuccess(items,bool) {
    return {
        type: 'USERS_EDIT_SUCCESS',
        payload:{
            "data":items,
            "isupdated":bool
        }        
    };
}

export function Userseditfailure(items,bool) {
    return {
        type: 'USERS_EDIT_FAILURE',
        payload:{
            "data":items,
            "isupdated":bool
        }
        
    };
}


export function Userdeletesuccess(items,bool) {
    return {
        type: 'USERS_DELETE_SUCCESS',
        payload:{
            "data":items,
            "isdeleted":bool
        }        
    };
}

export function Userdeletefailure(items,bool) {
    return {
        type: 'USERS_DELETE_FAILURE',
        payload:{
            "data":items,
            "isdeleted":bool
        }
        
    };
}

export function Userdetailsuccess(items,bool) {
    return {
        type: 'USER_DETAIL_SUCCESS',
        payload:{
            "data":items,
            "is_detail":bool
        }        
    };
}

export function Userdetailfailure(items,bool) {
    return {
        type: 'USER_DETAIL_FAILURE',
        payload:{
            "data":items,
            "is_detail":bool
        }
        
    };
}

export function Userslistsuccess(items) {
    return {
        type: 'USERSLIST_SUCCESS',
        payload:{
            "data":items
        }
        
    };
}

export function Userslistfailure(items) {
    return {
        type: 'USERSLIST_FAILURE',
        payload:{
            "data":items
        }
        
    };
}

export function register_success(items,bool) {
    return {
        type: 'REGISTER_SUCCESS',
        payload:{
            "data":items,
            "success":bool
        }       
    };
}

export function register_failure(items,bool) {
    return {
        type: 'REGISTER_FAILURE',
        payload:{
            "data":items,
            "success":bool
        }
        
    };
}


export const register_user = (data) => (dispatch) => {
    fetch('http://127.0.0.1:8000/api/users/create', {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
        }).then(function(response) {
            
            return response.json();
        })
        .then(function(response) 
        {
            if (response && response.status === 201)
            {
                toastr.success(response.message);
                dispatch(register_success(response,true));
            }
            else if(response && response.status === 400)
            {
                toastr.error(response.errors);
                dispatch(register_failure(response,false));

            }
        });
    
};

export const login_user = (data) => (dispatch) => {
    fetch('http://127.0.0.1:8000/api/users/authentication/', {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
        }).then(function(response) {
            
            return response.json();
        })
        .then(function(response) 
        {
            if (response && response.status === 200)
            {
                toastr.success(response.message);
                localStorage.setItem("token", response.data['token']);
                localStorage.setItem("username", response.data['username']);
                localStorage.setItem("email", response.data['email']);
                localStorage.setItem("role", response.data['role']);

                dispatch(LoginSuccess(true,response));
            }
            else if(response && response.status === 400)
            {
                toastr.error(response.message.non_field_errors[0]);
                dispatch(LoginFailure(false));

            }
        });
    
};


export const get_user = (searchdata) => (dispatch) => {
    let a="";
    if(searchdata!==undefined&&searchdata!==""){
        a="?search="+searchdata;
    }
    fetch('http://127.0.0.1:8000/api/users/list'+a, {
          method: "get",
          headers: {
            "Authorization": "Bearer "+localStorage.getItem("token")
          },
        }).then(function(response) {
            
            return response.json();
        })
        .then(function(response) 
        {
            if (response && response.status === 200)
            {
                // toastr.success(response.message);
                dispatch(Userslistsuccess(response.data));
            }
            else if(response && response.status === 400)
            {
                toastr.error(response.message);
                dispatch(Userslistfailure(response));

            }
        });
    
};

export const edit_user = (data,id) => (dispatch) => {
    fetch(`http://127.0.0.1:8000/api/users/detail/${id}`, {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
        }).then(function(response) {
            
            return response.json();
        })
        .then(function(response) 
        {
            if (response && response.status === 200)
            {
                // toastr.success(response.message);
                // dispatch(Userseditsuccess(response,true));
                dispatch(get_user());

            }
            else if(response && response.status === 400)
            {
                // toastr.error(response.errors);
                dispatch(Userseditfailure(response,false));

            }
        });
    
};


export const delete_user = (id) => (dispatch) => {
    fetch(`http://127.0.0.1:8000/api/users/detail/${id}`, {
          method: "delete",
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
        }).then(function(response) {
            
            return response.json();
        })
        .then(function(response) 
        {
            if (response && response.status === 200)
            {
                toastr.success(response.message);
                dispatch(get_user());
            }
            else if(response && response.status === 400)
            {
                toastr.error(response.errors);
                dispatch(Userdeletefailure(response,false));

            }
        });
    
};
