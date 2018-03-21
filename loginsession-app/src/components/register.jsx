import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Main from './main';
import {withRouter} from 'react-router-dom';
import update from 'react-addons-update';
import { connect } from "react-redux";
import { register_user } from "../actions/user_actions";
import toastr from 'toastr';
import $ from 'jquery';

class DocumentInput extends Component {

 constructor (props) {
      super(props);
      this.state = {

            inputvalue:'',
        },
      this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const htmldata = event.target;
        this.props.dynamictextChange(fieldName,fieldValue);
    }


  render() {

    return <div id={this.props.name}><input
      type="text"
      name={this.props.name} refs={this.props.name} id={this.props.name} onChange={this.onFieldChange} />
        <a onClick={this.props.addElement}><span className="glyphicon glyphicon-plus-sign"></span></a>
          {this.props.index?<a onClick={()=>this.props.removeElement(this.props.index,this.props.name)} name={this.props.name}><span className="glyphicon glyphicon-remove"></span></a>:""}
        </div>;
  }
}


class Register extends Component
{
  constructor(props) {
    super(props)
    this.state = {
          fields: {'role':'user',
          menus:[],
      },
      elements: [
        { text: 'Menu1','url':'/menu1',checked:false,submenus:''},
        { text: 'Menu2','url':'/menu2',checked:false,submenus:''},
        { text: 'Menu3','url':'/menu3',checked:false,submenus:''}
      ],
      documents1:[DocumentInput],
      documents2:[DocumentInput],
      documents3:[DocumentInput],
      inputValues1:{},
      inputValues2:{},
      inputValues3:{},
      inputvaluesList1:[],
      inputvaluesList2:[],
      inputvaluesList3:[],
      showInput:'',
      selectedmenu:'',
      errors: {},
      checked:false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
      this.updateStateList = this.updateStateList.bind(this);
      this.addElement = this.addElement.bind(this);
      this.removeElement = this.removeElement.bind(this);
      this.dynamictextChange = this.dynamictextChange.bind(this);
      this.handleduplicatevalueValidation = this.handleduplicatevalueValidation.bind(this);
      this.handlesubmenuvalueValiadtion = this.handlesubmenuvalueValiadtion.bind(this);
      this.dynamictextbox_creation = this.dynamictextbox_creation.bind(this);
      this.handleemptysubmenuvalueValiadtion = this.handleemptysubmenuvalueValiadtion.bind(this);
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

      let elements = [
        { text: 'Menu1','url':'/menu1',checked:false,submenus:''},
        { text: 'Menu2','url':'/menu2',checked:false,submenus:''},
        { text: 'Menu3','url':'/menu3',checked:false,submenus:''}
      ]
      let errors = {};
      let formIsValid = true;
      console.log(this.state.documents1,'documents!')


      let isEqual = function (value, other) {

        // Get the value type
        let type = Object.prototype.toString.call(value);

        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) return false;

        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

        // Compare the length of the length of the two items
        let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) return false;

        // Compare two items
        let compare = function (item1, item2) {

          // Get the object type
          let itemType = Object.prototype.toString.call(item1);

          // If an object or array, compare recursively
          if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
          }

          // Otherwise, do a simple comparison
          else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
              if (item1.toString() !== item2.toString()) return false;
            } else {
              if (item1 !== item2) return false;
            }

          }
        };

        // Compare properties
        if (type === '[object Array]') {
          for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
          }
        } else {
          for (let key in value) {
            if (value.hasOwnProperty(key)) {
              if (compare(value[key], other[key]) === false) return false;
            }
          }
        }

        // If nothing failed, return true
        return true;

        };

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


    //menus fields validation
     if(fields["menus"].length==0)
     {
      formIsValid = false;
      errors["menus"] = "Menu selection field is required (Atleast one menu should be selected)";

     }

    //menus fields values validation
      if(typeof fields["menus"]!=="undefined")
      {
        let arr1 = elements
        let arr3 = this.state.fields.menus

        if(isEqual(arr1, arr3))
        {
          formIsValid = false;
          errors["menus"] = "Menu selection field is required (Atleast one menu should be selected)";
        }
        else
        {
          this.state.fields.menus.map((menu, index) => {

            if(menu.checked && menu.text=="Menu1")
            {
              let submenu1_list ={}
              let value1=[]
              let count=0
              $('#Menu1_lists div>input').each(function() {
                  value1.push($(this).val());
              });
              for(let u=0;u<value1.length;u++)
              {
                if(value1[u]=="")
                {
                  count++;
                }
              }
              if(this.state.inputvaluesList1!=undefined)
              {
                if(this.state.inputvaluesList1.length===0)
                {
                  formIsValid = false;
                  errors["Menu1_submenus"] = "Submenu fields should not be left empty";
                }
                else if(count>0)
                {
                  formIsValid = false;
                  errors["Menu1_submenus"] = "Submenu fields should not be left empty";
                }
                else if(this.state.inputvaluesList1.length>0)
                {
                  let value_type_status = this.handlesubmenuvalueValiadtion(this.state.inputvaluesList1)
                  let empty_value_status = this.handleemptysubmenuvalueValiadtion(this.state.inputvaluesList1)
                  if(empty_value_status)
                  {
                    formIsValid = false;
                    errors["Menu1_submenus"] = "Submenu fields  values should not be empty or remove it";
                  }
                  else if(value_type_status)
                  {
                    formIsValid = false;
                    errors["Menu1_submenus"] = "Submenu fields  values should contain only letters";
                  }
                  else
                  {
                      let duplicate_element_status = this.handleduplicatevalueValidation(this.state.inputvaluesList1)
                      if(duplicate_element_status)
                      {
                          formIsValid = false;
                          errors["Menu1_submenus"] = "Submenu fields list should not contain duplicate values";
                      }
                      else
                      {
                          menu.submenus = this.state.inputvaluesList1
                      }

                    }

                  }
                }
              }
              if(menu.checked && menu.text=="Menu2")
              {
                  let submenu2_list={}
                  let value2=[]
                  let count=0
                  $('#Menu2_lists div>input').each(function() {
                      value2.push($(this).val());
                  });
                  for(let u=0;u<value2.length;u++)
                  {
                    if(value2[u]=="")
                    {
                      count++;
                    }
                  }

              if(this.state.inputvaluesList2!=undefined)
              {
                if(this.state.inputvaluesList2.length===0)
                {
                  formIsValid = false;
                  errors["Menu2_submenus"] = "Submenu fields should not be left empty";
                }
                else if(count>0)
                {
                  formIsValid = false;
                  errors["Menu2_submenus"] = "Submenu fields should not be left empty";
                }
                else if(this.state.inputvaluesList2.length>0)
                {
                  let value_type_status = this.handlesubmenuvalueValiadtion(this.state.inputvaluesList2)
                  let empty_value_status = this.handleemptysubmenuvalueValiadtion(this.state.inputvaluesList2)
                  if(empty_value_status)
                  {
                    formIsValid = false;
                    errors["Menu2_submenus"] = "Submenu fields  values should not be empty or remove it";
                  }
                  else if(value_type_status)
                  {
                    formIsValid = false;
                    errors["Menu2_submenus"] = "Submenu fields  values should contain only letters";
                  }
                  else
                  {
                      let duplicate_element_status = this.handleduplicatevalueValidation(this.state.inputvaluesList2)
                      if(duplicate_element_status)
                      {
                          formIsValid = false;
                          errors["Menu2_submenus"] = "Submenu fields list should not contain duplicate values";
                      }
                      else
                      {
                          menu.submenus = this.state.inputvaluesList2
                      }

                    }

                  }
                }
              }
              if(menu.checked && menu.text=="Menu3")
              {
                let submenu3_list={}
                let value3=[]
                let count=0
                $('#Menu3_lists div>input').each(function() {
                    value3.push($(this).val());
                });
                for(let u=0;u<value3.length;u++)
                {
                  if(value3[u]=="")
                  {
                    count++;
                  }
              }
              if(this.state.inputvaluesList3!=undefined)
              {
                if(this.state.inputvaluesList3.length===0)
                {
                  formIsValid = false;
                  errors["Menu3_submenus"] = "Submenu fields should not be left empty";
                }
                else if(count>0)
                {
                  formIsValid = false;
                  errors["Menu3_submenus"] = "Submenu fields should not be left empty";
                }
                else if(this.state.inputvaluesList3.length>0)
                {
                  let value_type_status = this.handlesubmenuvalueValiadtion(this.state.inputvaluesList3)
                  let empty_value_status = this.handleemptysubmenuvalueValiadtion(this.state.inputvaluesList3)
                  if(empty_value_status)
                  {
                    formIsValid = false;
                    errors["Menu3_submenus"] = "Submenu fields  values should not be empty or remove it";
                  }
                  else if(value_type_status)
                  {
                    formIsValid = false;
                    errors["Menu3_submenus"] = "Submenu fields  values should contain only letters";
                  }
                  else
                  {
                      let duplicate_element_status = this.handleduplicatevalueValidation(this.state.inputvaluesList3)
                      if(duplicate_element_status)
                      {
                          formIsValid = false;
                          errors["Menu3_submenus"] = "Submenu fields list should not contain duplicate values";
                      }
                      else
                      {
                          menu.submenus = this.state.inputvaluesList3
                      }

                    }

                  }
                }
              }
          });

        }
      }

      if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');

          if (!(lastAtPos <lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "The given email is not valid email address";
          }

    }
    this.setState({errors: errors});
    return formIsValid;
   }

   handlesubmenuvalueValiadtion(inputArray)
   {
      let valuetypemismatch = false ;
      inputArray.map(function(item) {
        let value=Object.values(item);
        for(let i=0;i<value.length;i++)
        {
           if(!value[i].match(/^[a-zA-Z]+$/))
           {
              valuetypemismatch=true
           }
        }

      });
      return valuetypemismatch;

   }

   handleemptysubmenuvalueValiadtion(inputArray)
   {
      let valuetypemismatch = false ;
      inputArray.map(function(item) {
        let value=Object.values(item);
        for(let i=0;i<value.length;i++)
        {
           if(value[i]=="")
           {
              valuetypemismatch=true
           }
        }

      });
      return valuetypemismatch;

   }

   handleduplicatevalueValidation(inputArray)
   {
      let seenDuplicate = false;
      inputArray.map(function(item) {
        let value=Object.values(item);
        if((new Set(value)).size !== value.length)
        {
          seenDuplicate=true;
        }

      });
      return seenDuplicate;
   }


   //add dynamically created elements
   addElement(event)
   {
      let a=event.target.parentNode
      let b=a.parentNode
      let c=b.parentNode
      let target_id=c.id

      if(target_id==="Menu1_lists")
      {
        const documents1 = this.state.documents1.concat(DocumentInput);
        this.setState({documents1: documents1});
      }
      if(target_id==="Menu2_lists")
      {
        const documents2 = this.state.documents2.concat(DocumentInput);
        this.setState({documents2: documents2});
      }
      if(target_id==="Menu3_lists")
      {
        const documents3 = this.state.documents3.concat(DocumentInput);
        this.setState({documents3: documents3});
      }

   }

   //remove dynamically created elements
   removeElement(index,name)
   {

      if(name.startsWith("submenu1"))
      {
        let totallist1 = this.state.documents1;
        totallist1.map((Element, sindex) => {
           if(sindex === index)
           {
             delete totallist1[sindex]

           }
        });

        let update_inputlist1 =this.state.inputvaluesList1;
        update_inputlist1.map((objlist,index) => {
          for(let[key,value] of Object.entries(objlist)) {
                if (key===name) {
                  delete objlist[key];
                }
          }
        });


        this.setState({documents1:totallist1,inputvaluesList1:update_inputlist1});

      }
      if(name.startsWith("submenu2"))
      {
        let totallist2 = this.state.documents2;
        totallist2.map((Element, sindex) => {
           if(sindex === index)
           {
             delete totallist2[sindex]
           }
        });

        let update_inputlist2 =this.state.inputvaluesList2;
        update_inputlist2.map((objlist,index) => {
          for(let[key,value] of Object.entries(objlist)) {
                if (key===name) {
                  delete objlist[key];
                }
          }
        });


        this.setState({documents2:totallist2,inputvaluesList2:update_inputlist2});

      }
      if(name.startsWith("submenu3"))
      {
        let totallist3 = this.state.documents3;
        totallist3.map((Element, sindex) => {
           if(sindex === index)
           {
             delete totallist3[sindex]
           }
        });

        let update_inputlist3 =this.state.inputvaluesList3;
        update_inputlist3.map((objlist,index) => {
          for(let[key,value] of Object.entries(objlist)) {
                if (key===name) {
                  delete objlist[key];
                }
          }
        });


        this.setState({documents3:totallist3,inputvaluesList3:update_inputlist3});


      }

   }

   //dynamic textbox field chnage
   dynamictextChange(name,value)
  {
    console.log(name,'nameeeeeeee')
    if(name.startsWith("submenu1"))
    {
      let inputValues1= this.state.inputValues1;
      let inputvaluesList1=[];
      inputValues1[name]=value
      inputvaluesList1.push(inputValues1)
      this.setState({inputValues1: inputValues1 ,
                    inputvaluesList1:inputvaluesList1})


      // });
      // console.log(inputvaluesList1,'inputvaluelisty')
      // // inputValues1[name]=value
      // // inputvaluesList1.push(inputValues1)
      // this.setState({ inputvaluesList1:inputvaluesList1})
    }
    if(name.startsWith("submenu2"))
    {
      let inputValues2= this.state.inputValues2;
      let inputvaluesList2=[];
      inputValues2[name]=value
      inputvaluesList2.push(inputValues2)
      this.setState({inputValues2: inputValues2 ,
                    inputvaluesList2:inputvaluesList2})
    }
    if(name.startsWith("submenu3"))
    {
      let inputValues3= this.state.inputValues3;
      let inputvaluesList3=[];
      inputValues3[name]=value
      inputvaluesList3.push(inputValues3)
      this.setState({inputValues3: inputValues3 ,
                    inputvaluesList3:inputvaluesList3})
    }

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

  //update menu state values
  updateStateList(e, value,index){
    let fields=this.state.fields;
    let array = this.state.elements;


    if (e.target.checked)
    {
      value.checked=true
      value.submenus = this.state.inputvaluesList

    }
    else
    {
     // delete frm an array
      value.checked =false
      let documents1=[DocumentInput]
      let documents2=[DocumentInput]
      let documents3=[DocumentInput]

      if(value.text=="Menu1")
      {
        this.setState({"documents1":documents1})
      }
      if(value.text=="Menu2")
      {
        this.setState({"documents2":documents2})
      }
      if(value.text=="Menu3")
      {
        this.setState({"documents3":documents3})
      }

    }
    this.setState({
      fields: update(fields,{menus:{$set:array}})
    })

  }

  dynamictextbox_creation(index)
  {
      const documents1 = this.state.documents1.map((Element, index) => {
      const name = `submenu1-${index}`
      return <Element ref={'Element-'+index} key={ index } index={ index } removeElement={this.removeElement}
       addElement={this.addElement}
       name={name} dynamictextChange ={this.dynamictextChange}/>
    });

    const documents2 = this.state.documents2.map((Element, index) => {
      const name = `submenu2-${index}`
      return <Element ref={'Element-'+index} key={ index } index={ index } removeElement={this.removeElement}
       addElement={this.addElement}
       name={name} dynamictextChange ={this.dynamictextChange}/>
    });

    const documents3 = this.state.documents3.map((Element, index) => {
      const name = `submenu3-${index}`
      return <Element ref={'Element-'+index} key={ index } index={ index } removeElement={this.removeElement}
       addElement={this.addElement}
       name={name} dynamictextChange ={this.dynamictextChange}/>
    });

    if(index==0)
    {
      return documents1
    }
    if(index ==1)
    {
      return documents2
    }
    if(index ==2)
    {
      return documents3
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
                  <input type="checkbox" name="menus" onClick={(e)=>this.updateStateList(e,item,i)} id={item.text} />   {item.text}
                  {item.checked?<div ref={item.text+'_lists'} id={item.text+'_lists'} name={item.text+'_submenus'}>{this.dynamictextbox_creation(i)}
                  <span style={{color: "red"}}>
                    {this.state.errors[item.text+'_submenus']}</span></div>:<div></div>}
                </li>
              )}
            </ul>
            <br/>
            <span style={{color: "red"}}>{this.state.errors["menus"]}</span>
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
