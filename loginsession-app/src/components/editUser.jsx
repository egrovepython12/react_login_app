import React, { Component } from "react";
import Main from './main';
import update from 'react-addons-update';
import { connect } from "react-redux";
import toastr from 'toastr';
import {withRouter} from 'react-router-dom';
import { edit_user } from "../actions/user_actions";
import Users from "../components/users";
import { Prompt } from 'react-router'


class DocumentInput extends Component {

 constructor (props) {
      super(props);
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
    
    return <div>
        <input  type="text" name={this.props.name} refs={this.props.name} id={this.props.name} onChange={this.onFieldChange} value={this.props.value}/>
        <a onClick={this.props.addElement}><span className="glyphicon glyphicon-plus-sign"></span></a>
        <a onClick={()=>this.props.removeElement(this.props.index,this.props.name)} name={this.props.name}><span className="glyphicon glyphicon-remove"></span>
        </a>
    </div>;
  }
}


class EditUser extends Component 
{
  constructor(props) {
    super(props)
    this.state = {
    	fields:props.edituserdata,
      showComponent: false,
      documents1:[],
      documents2:[],
      documents3:[],
      inputValues1:{},
      inputValues2:{},
      inputValues3:{},
      inputvaluesList1:[],
      inputvaluesList2:[],
      inputvaluesList3:[],
      errors:{}     
  }
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.displayrole = this.displayrole.bind(this);
    this.handlecancel = this.handlecancel.bind(this);
    this.updateStateList = this.updateStateList.bind(this);
    this.displaysubmenus = this.displaysubmenus.bind(this);
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.dynamictextChange = this.dynamictextChange.bind(this);
    this.getmenuList = this.getmenuList.bind(this);
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

    if(this.props.edituserdata!=undefined)
    {
        let documents1=this.state.documents1;
        let documents2=this.state.documents2;
        let documents3=this.state.documents3;

        if(this.props.edituserdata.menus.length >0)
        {
          this.props.edituserdata.menus.map((item, i) =>{

            if(item.checked&&item.text=="Menu1")
              {
                if(item.submenus.length>0)
                {
                  let audioListNodes =item.submenus.map(function(valueslist,index) 
                    {
                      if(index==0)
                      {
                        for (let [key, value, index] of Object.entries(valueslist)) {  
                          documents1.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
                                                name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
                          }
    
                      }
                            
                    },this);

                    return documents1

                }
              }
              if(item.checked&&item.text=="Menu2")
              {
                if(item.submenus.length>0)
                {
                  let audioListNodes =item.submenus.map(function(valueslist,index) 
                    {
                      if(index==0)
                      {
                        for (let [key, value, index] of Object.entries(valueslist)) {  
                          documents2.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
                                                name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
                          }
                          

                      }
                            
                    },this);

                    return documents2

                }
              }
              if(item.checked&&item.text=="Menu3")
              {
                if(item.submenus.length>0)
                {
                  let audioListNodes =item.submenus.map(function(valueslist,index) 
                    {
                      if(index==0)
                      {
                        for (let [key, value, index] of Object.entries(valueslist)) {  
                          documents3.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
                                                name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
                          }
                          
                      }
                            
                    },this);

                  return documents3 

                }
              }                     
          })
        }

        this.setState({'documents3':documents3,'documents2':documents2,'documents1':documents1})
    }

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
      let elements = [
        { text: 'Menu1','url':'/menu1',checked:false},
        { text: 'Menu2','url':'/menu2',checked:false},
        { text: 'Menu3','url':'/menu3',checked:false}
      ]
      
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

 updateStateList(e, value,index)
 {
    let fields=this.state.fields;
    let array = this.state.fields.menus;
    if (e.target.checked){
      //append to array
      value.checked=true     
  
    } 
    else{
     
      // delete frm an array
      value.checked =false               
    }
   this.setState({
        fields: update(fields,{menus:{$set : array}})
      })  
    
  }

  dynamictextChange(name,value)
  {
    if(name.startsWith("submenu1"))
    {
      let inputValues1= this.state.inputValues1;
      let inputvaluesList1=[];
      inputValues1[name]=value
      inputvaluesList1.push(inputValues1)  
      this.setState({inputValues1: inputValues1 ,
                    inputvaluesList1:inputvaluesList1})
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

  addElement(event)
   {     
      let a=event.target.parentNode
      let b=a.parentNode
      let c=b.parentNode
      let target_id=c.id
      console.log(target_id,)
      // console.log(this.state.documents1,'documents1')
      // console.log(this.state.documents2,'documents2')
      // console.log(this.state.documents3,'documents3')

      if(target_id==="Menu1_lists")
      {
        const documents1 = this.state.documents1.concat(DocumentInput);
        console.log(documents1,'ssssssss')
        this.setState({documents1: documents1});
      }
      if(target_id==="Menu2_lists")
      {
        const documents2 = this.state.documents2.concat(DocumentInput);
        console.log(documents2,'ssssssss')
        this.setState({documents2: documents2});
      }
      if(target_id==="Menu3_lists")
      {
        const documents3 = this.state.documents3.concat(DocumentInput);
        console.log(documents3,'ssssssss')
        this.setState({documents3: documents3});
      }        
      
   }
  
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
        
        this.setState({documents1:totallist1});

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
        
        this.setState({documents2:totallist2});

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
        
        this.setState({documents3:totallist3});

      }
      
  }

  getmenuList(index)
  {
    return(this.displaysubmenus(index))
  }


  displaysubmenus(index)
  {
    console.log(this.state.documents1,'docuemnts1')
    console.log(this.state.documents2,'docuemnts2')
    console.log(this.state.documents3,'docuemnts3')


    const documents1 = this.state.documents1.map((valueslist, index) => {
      for (let [key, value, index] of Object.entries(valueslist)) { 
                 

          return(<DocumentInput  index={ valueslist.props.index } removeElement={this.removeElement}  addElement={this.addElement}  
                                name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
          }
    });

    const documents2 = this.state.documents2.map((valueslist, index) => 
    {
      for (let [key, value, index] of Object.entries(valueslist)) {  
                  
             return(<DocumentInput  index={ valueslist.props.index } removeElement={this.removeElement}  addElement={this.addElement}  
                                name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
            }    
    });

    const documents3 = this.state.documents3.map((valueslist, index) => {
      for (let [key, value, index] of Object.entries(valueslist)) {  
                

                  return(<DocumentInput  index={ valueslist.props.index } removeElement={this.removeElement}  addElement={this.addElement}  
                                name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
            }   
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


    // let submenus_list=[];
    
    // if(menuvalue=="Menu1"&&submenus.length>0)
    // {
    //   let audioListNodes =submenus.map(function(valueslist,index) 
    //   {
    //     if(index==0)
    //     {
    //       for (let [key, value, index] of Object.entries(valueslist)) {  
    //         submenus_list.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
    //                               name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
    //         }
    //     }
              
    //   },this);
    //   // this.documents_update(documents1,"menu1")

    //   return submenus_list                                                             
    // }
    // if(menuvalue=="Menu2"&&submenus.length>0)
    // {
    //   let audioListNodes =submenus.map(function(valueslist,index) 
    //   {
    //     if(index==0)
    //     {
    //       for (let [key, value, index] of Object.entries(valueslist)) {  
    //         submenus_list.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
    //                               name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
    //         }
    //     }
              
    //   },this);

    //   return submenus_list                                                             
    // }
  //   if(menuvalue=="Menu3"&&submenus.length>0)
  //   {
  //     let audioListNodes =submenus.map(function(valueslist,index) 
  //     {
  //       if(index==0)
  //       {
  //         for (let [key, value, index] of Object.entries(valueslist)) {  
  //           submenus_list.push(<DocumentInput  index={ index } removeElement={this.removeElement}  addElement={this.addElement}  
  //                                 name={key} dynamictextChange ={this.dynamictextChange} value={value} />)
  //           }
  //       }
              
  //     },this);

  //   return submenus_list                                                             
  //   }

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
                <div className="form-group">
                    <label htmlFor="menu">Menu:</label>
                      <ul>
                      {this.state.fields.menus.map((item, i) =>
                        <li key={i}>
                          <input type="checkbox"  checked={item.checked} onClick={(e)=>this.updateStateList(e,item,i)} />   {item.text}
                          
                          {item.checked?<div ref={item.text+'_lists'} id={item.text+'_lists'} name={item.text+'_submenus'}>{this.getmenuList(i)}
                  <span style={{color: "red"}}>
                    {this.state.errors[item.text+'_submenus']}</span></div>:<div></div>}

                        </li>
                      )}
                    </ul>
                  <br/>              
                </div>
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