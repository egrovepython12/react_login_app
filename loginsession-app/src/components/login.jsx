import React, { Component } from "react";
import Main from './main';
import update from 'react-addons-update';
import { connect } from "react-redux";
import toastr from 'toastr';
import {withRouter} from 'react-router-dom';
import { login_user } from "../actions/user_actions";


class Login extends Component
{
  constructor(props) {
    super(props)
    this.state = {
    	fields:{},
      errors: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handlelogin = this.handlelogin.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  	}

  componentWillReceiveProps(nextProps)
  {
    console.log(nextProps,'nextProspppppp')
    if(nextProps.loginReducer.isloggedin == true)
    {

      this.props.history.push('/users')
    }

  }

  componentDidMount(){
    console.log(this.props,'props data')
    if(localStorage.getItem("token")){
      this.props.history.push("/users")
    }
  }

  //handles the change event for fields in login form
  handleChange(event)
  {
    let fields = this.state.fields;
        this.setState({
            fields: update(fields, {[event.target.name]: {$set: event.target.value}})
        });
  }



  // Handles the validation for all the fields in form
  handleValidation()
  {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      //Email
      if(!fields["email"]){
         formIsValid = false;
         errors["email"] = "Email field is required";
      }

      if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');

          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "The given email address is not a valid email address";
          }
      }

      //Password
      if(!fields["password"]){
         formIsValid = false;
         errors["password"] = "Password field is required";
      }


    this.setState({errors: errors});
    return formIsValid;

  }

  // Handles the login form while submitting it
  handlelogin(event)
  {
	  event.preventDefault();
  	let fields = this.state.fields;
    if(this.handleValidation())
    {
      this.props.login_user(fields);

    }
  }

  render() {
    return (
    <div>
      <Main/>
      	<div className="container">
		  <h2>Login form</h2>
			<form onSubmit={this.handlelogin}>
			    <div className="form-group">
			      <label for="email">Email:</label>
			      <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
			      <span style={{color: "red"}}>{this.state.errors["email"]}</span>
          </div>
			    <div className="form-group">
			      <label for="pwd">Password:</label>
			      <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={this.handleChange}/>
			      <span style={{color: "red"}}>{this.state.errors["password"]}</span>
          </div>
			    <button type="submit" className="btn btn-default">Login</button>
		    </form>
		</div>
	</div>

    );
  }
}

function mapStateToProps(state){

	return {
	    users:state.usersReducer,
	    loginReducer: state.loginReducer,
	}
}
export default withRouter(connect(mapStateToProps,{login_user})(Login));


// export default  withRouter (connect((state) => {
//   const users = state.usersReducer
//   const loginReducer = state.loginReducer

//   return {
//       users,loginReducer
//   };

// })(Login));
