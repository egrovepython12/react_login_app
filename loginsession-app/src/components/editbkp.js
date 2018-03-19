import React, { Component } from "react";
import Main from './main';
import update from 'react-addons-update';
import { connect } from "react-redux";
import toastr from 'toastr';
import {withRouter} from 'react-router-dom';
import { edit_user } from "../actions/user_actions";
import Users from "../components/users";
import { Prompt } from 'react-router'


class EditUser extends Component 
{
  constructor(props) {
    super(props)
    this.state = {
    	fields:props.edituserdata,
      showComponent: false,
      errors:{},
      checked:false,
      elements: [
        { text: 'Menu1','url':'/menu1'},
        { text: 'Menu2','url':'/menu2'},
        { text: 'Menu3','url':'/menu3'}
      ],
  }
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.displayrole = this.displayrole.bind(this);
    this.handlecancel = this.handlecancel.bind(this);
    this.updateStateList = this.updateStateList.bind(this);
    this.handleupdatemenu = this.handleupdatemenu.bind(this);
  }
  

  handleChange(event)
  {
    let fields = this.state.fields;
        this.setState({
            fields: update(fields, {[event.target.name]: {$set: event.target.value}})
        });
  }

  componentDidMount()
  {
   
  if(this.props.loginReducer.isloggedin == true)
    {

      this.props.history.push('/users')
    }

    let arrayOne= this.state.elements;
    let arrayTwo =this.state.fields.menus;

    for(var i=0;i<arrayOne.length;i++)
    {
      if(arrayTwo.indexOf(arrayOne[i].text)!=-1)
      {
        arrayOne[i].checked=true
      }
    }

    this.setState({'elements':arrayOne})  
  }

  componentWillReceiveProps(nextProps)
  {
    console.log(nextProps.edituserdata.menus,'nextProps value')
    console.log(this.state.fields.menus,'fields valeu')

  }


  handlecancel()
  {
    this.props.show(false)
  }
   
  handleValidation()
  {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      
      //username
      if(!fields["username"]){
         formIsValid = false;
         errors["username"] = "username field is required";
      }
      if(typeof fields["username"] !== "undefined"){
           if(!fields["username"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["username"] = "Username field value should contain only letters";
           }          
      }

    this.setState({errors: errors});
    return formIsValid;

  }

  handleUpdate(event)
  {
	  event.preventDefault();
  	let fields = this.state.fields;
    let edit_user_id = this.state.fields.id
    if(this.handleValidation())
    {
      this.props.edit_user(fields,edit_user_id)
      this.props.show(false)
    }
  }

  displayrole()
  {
    let data='';
    if(typeof(localStorage.getItem('role')) !== 'undefined' && localStorage.getItem('role') !== null  && localStorage.getItem('role') === 'admin'){
      data= <div className="form-group">
              <label htmlFor="role">Role:</label>
              <div className="radio">
                <label>
                  <input type="radio"  value="user"checked={this.state.fields.role==="user"} onChange={this.handleChange} name="role"/>
                  user
                </label>
                <label>
                  <input type="radio" value="admin" checked={this.state.fields.role==="admin"} onChange={this.handleChange} name="role"/>
                  admin
                </label>
              </div>
          </div>
    }
    return data;
  }

  updateStateList(e, value,index){

    let fields=this.state.fields;
    let elements = this.state.elements

    if (e.target.checked){
      //append to array
      // let arrayOne= this.state.elements;

      for(var i=0;i<this.state.elements.length;i++)
      {
        if(value == this.state.elements[i].text)
        {
          this.state.elements[i].checked=true
        } 
      }
      
      // if(fields.menus.indexOf(value)>-1)
      // {
      //   alert('already exists')
      // }
      // else
      // {
        this.setState({
          fields: update(fields,{menus:{$push: [value]}}),
          elements:this.state.elements
      })

      // }
      
    } 
    else{

      for(var i=0;i<this.state.elements.length;i++)
      {
        if(value == this.state.elements[i].text)
        {
          this.state.elements[i].checked=false
        }
       
      }

      // delete frm an array
      let array = this.state.fields.menus;
      array.splice(index,1);
    
      this.setState({
          fields: update(fields,{menus:{$set : array}}),
          elements:this.state.elements

        })             

    }
  
  }


  handleupdatemenu()
  {
    let htmldata='';
      htmldata= <div className="form-group">
          <label htmlFor="menu">Menu:</label>
            <ul>
            {this.state.elements.map((item, i) =>
              <li key={i}>
                <input type="checkbox"  checked={item.checked} onClick={(e)=>this.updateStateList(e,item.text,i)} />   {item.text}
              </li>
            )}
          </ul>
        <br/>              
      </div>

    return htmldata;

  }
  


  render() {
    return (
    <div>

           <Main/>
          {/*<Prompt
              when={this.props.loginReducer.isloggedin}
              message='You have unsaved changes, are you sure you want to leave?'
              />*/}
           	<div className="container">
      		  <h2>Edit Profile</h2>
      			<form onSubmit={this.handleUpdate}>
      			    <div className="form-group">
      			      <label for="username">Username:</label>
      			      <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" value={this.state.fields.username} onChange={this.handleChange}/>
      			      <span style={{color: "red"}}>{this.state.errors["username"]}</span>
                </div>
                {this.handleupdatemenu()}
                {this.displayrole()}
      			    <button type="submit" className="btn btn-default">Update</button>
      		    </form>
            <button type="button" className="btn btn-default" onClick={this.handlecancel}>Cancel</button>

      		</div>  
    
    </div>

    );
  }
}

function mapStateToProps(state){
  
	return {
	    users:state.usersReducer,
      loginReducer:state.loginReducer

	}
}
export default withRouter(connect(mapStateToProps,{edit_user})(EditUser));


// export default withRouter(connect((state) => {
//   const users = state.usersReducer
//   const loginReducer = state.loginReducer
  
//   return {
//       users,loginReducer
//   };

// })(EditUser));