import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import update from 'react-addons-update';
import { connect } from "react-redux";
import { register_user } from "../actions/user_actions";
import toastr from 'toastr';

class Register extends Component 
{
	constructor(props) {
    super(props)
    this.state = {
          fields: {'role':'user',
        menus:[]
      },
      elements: [
        { text: 'Menu1','url':'/menu1',checked:false},
        { text: 'Menu2','url':'/menu2',checked:false},
        { text: 'Menu3','url':'/menu3',checked:false}
      ],
          errors: {},
          checked:false         
      }
  		this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
      this.updateStateList = this.updateStateList.bind(this);
  	}
  
  componentWillReceiveProps(nextProps)
  {
    if(nextProps.registerReducer.success == true)
    {

      this.props.history.push('/login')
    }

  }

  //handles the change event for all fields of register form
  handleChange(e)
  {
      let fields = this.state.fields;
      this.setState({
          fields: update(fields,{[e.target.name]: {$set: e.target.value}}),
      });
  }


    
  // handles the validation for all fields of register form
  handleValidation()
  {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      console.log(fields,'fields value')
      //Name
      if(!fields["username"]){
         formIsValid = false;
         errors["username"] = "Username field is required";
      }

      if(typeof fields["username"] !== "undefined"){
           if(!fields["username"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["username"] = "Username field value should contain only letters";
           }          
      }

      //Password
      if(!fields["password"]){
         formIsValid = false;
         errors["password"] = "Password field is required";
      }

      if(typeof fields["password"] !== "undefined"){
           if(!fields["password"].match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
               formIsValid = false;
               errors["password"] = "Password field should be of length  6 to 16 valid characters and atleast one number and one special character";
           }          
      }

      
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
            errors["email"] = "The given email is not valid email address";
          }   

    }
    this.setState({errors: errors});
    return formIsValid;
   }


  // handles the submit event for registration form fields
  handleSubmit(e) { 
    e.preventDefault(); 
    if(this.handleValidation())
    {
      this.props.register_user(this.state.fields);
    }else{
      toastr.error("Form has errors.")
    }
    
  } 
  

  updateStateList(e, value,index){
    let fields=this.state.fields;
    let menulist=[];
    console.log(value,'value array')
    if (e.target.checked){
      //append to array
      this.setState({
        fields: update(fields,{menus:{$push: [value]}})
      })
    } 
    else{
     
      // delete frm an array
      let array = this.state.fields.menus;
      array.splice(index,1);
    
      this.setState({
          fields: update(fields,{menus:{$set : array}})
        })             

    }
  
}

  render() { 

    return (
    <div>
      <Main/>
      	<div className="container">
		  <h2>Register Form</h2>
      <form onSubmit={this.handleSubmit} >        
          <div className="form-group">
            <label htmlFor="text">Email:</label>
            <input type="text" className="form-control" id="email" placeholder="Enter email" 
            name="email" onChange={this.handleChange} />
            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
          </div>
          <div className="form-group">
            <label htmlFor="text">username:</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" 
            name="username" onChange={this.handleChange} />
            <span style={{color: "red"}}>{this.state.errors["username"]}</span>
          </div>
			    <div className="form-group">
			      <label htmlFor="password">Password:</label>
			      <input type="password" className="form-control" id="password" placeholder="Enter password" 
			      name="password" onChange={this.handleChange} />
            <span style={{color: "red"}}>{this.state.errors["password"]}</span>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
			        <div className="radio">
                <label>
                  <input type="radio" value="user" checked={this.state.fields.role==="user"} onChange={this.handleChange} name="role"/>
                  user
                </label>
                <label>
                  <input type="radio" value="admin" checked={this.state.fields.role==="admin"} onChange={this.handleChange} name="role"/>
                  admin
                </label>
              </div>
              
          </div>
          <div className="form-group">
            <label htmlFor="menu">Menu:</label>
              <ul>
              {this.state.elements.map((item, i) =>
                <li key={i}>
                  
                  <input type="checkbox" name="menus" onClick={(e)=>this.updateStateList(e,item,i)} />   {item.text}
                </li>
              )}
            </ul>
            <br/>              
          </div>
			    <button type="submit" className="btn btn-default">Submit</button>
		    </form>
		</div>
	</div>

    );
  }
}


function mapStateToProps(state){
	return {
		users:state.usersReducer,
    registerReducer:state.registerReducer
	}
}
export default withRouter(connect(mapStateToProps,{register_user})(Register));


// export default withRouter(connect((state) => {
//   const registerReducer = state.registerReducer
//   const users = state.usersReducer

//   return {
//     registerReducer, users
//   };

// })(Register));
