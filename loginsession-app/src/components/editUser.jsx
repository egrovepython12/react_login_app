import React, { Component } from "react";
import Main from './main';
import update from 'react-addons-update';
import { connect } from "react-redux";
import toastr from 'toastr';
import {withRouter} from 'react-router-dom';
import { edit_user } from "../actions/user_actions";
import Users from "../components/users";
import { Prompt } from 'react-router'
import $ from 'jquery';

class DocumentInput extends Component {

 constructor (props) {
      super(props);
      this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let htmldata = event.target;
        this.props.dynamictextChange(fieldName,fieldValue);
    }


  render() {

    return <div>
        <input  type="text" name={this.props.name} refs={this.props.name} id={this.props.name} onChange={this.onFieldChange} value={this.props.value}/>
        <a onClick={this.props.addElement}><span className="glyphicon glyphicon-plus-sign"></span></a>
          {this.props.index?<a onClick={()=>this.props.removeElement(this.props.index,this.props.name)} name={this.props.name}><span className="glyphicon glyphicon-remove"></span></a>:""}
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
    this.handleduplicatevalueValidation = this.handleduplicatevalueValidation.bind(this);
    this.handlesubmenuvalueValiadtion = this.handlesubmenuvalueValiadtion.bind(this);
    this.handleemptysubmenuvalueValiadtion = this.handleemptysubmenuvalueValiadtion.bind(this);

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
    console.log(this.props,'propsssssssss')

  if(this.props.loginReducer.isloggedin == true)
    {

      this.props.history.push('/users')
    }

    if(this.props.edituserdata!=undefined)
    {
        let documents1=this.state.documents1;
        let documents2=this.state.documents2;
        let documents3=this.state.documents3;
        let inputvaluesList1 = this.state.inputvaluesList1;
        let inputvaluesList2 = this.state.inputvaluesList2;
        let inputvaluesList3 = this.state.inputvaluesList3;

        if(this.props.edituserdata.menus.length >0)
        {
          this.props.edituserdata.menus.map((item, i) =>{

            if(item.checked&&item.text=="Menu1")
              {
                if(item.submenus.length>0)
                {
                  let submenuListNodes =item.submenus.map(function(valueslist,index)
                    {
                      inputvaluesList1.push(valueslist);
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
                  let submenuListNodes =item.submenus.map(function(valueslist,index)
                    {
                      inputvaluesList2.push(valueslist);

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
                  let submenuListNodes =item.submenus.map(function(valueslist,index)
                    {
                      inputvaluesList3.push(valueslist);
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
        this.setState({'documents3':documents3,'documents2':documents2,'documents1':documents1,
                      'inputvaluesList1':inputvaluesList1,'inputvaluesList2':inputvaluesList2,'inputvaluesList3':inputvaluesList3})
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
              console.log(count,'countttt')
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
      value.submenus = this.state.inputvaluesList
      if(value.text=="Menu1"&& this.state.documents1.length==0)
      {
        let documents1=[DocumentInput]
        this.setState({"documents1":documents1})
      }
      if(value.text=="Menu2"&& this.state.documents2.length==0)
      {
        let documents2=[DocumentInput]
        this.setState({"documents2":documents2})
      }
      if(value.text=="Menu3"&& this.state.documents3.length==0)
      {
        let documents3=[DocumentInput]
        this.setState({"documents3":documents3})
      }
    }
    else{

      // delete frm an array
      value.checked =false
      let documents1=[DocumentInput]
      let documents2=[DocumentInput]
      let documents3=[DocumentInput]
      let n_inputValuesList1=[]
      let n_inputValuesList2=[]
      let n_inputValuesList3=[]

      if(value.text=="Menu1")
      {
        this.setState({"documents1":documents1,"inputvaluesList1":n_inputValuesList1})
      }
      if(value.text=="Menu2")
      {
        this.setState({"documents2":documents2,"inputvaluesList2":n_inputValuesList2})
      }
      if(value.text=="Menu3")
      {
        this.setState({"documents3":documents3,"inputvaluesList3":n_inputValuesList3})
      }
    }
   this.setState({
        fields: update(fields,{menus:{$set : array}})
      })

  }


dynamictextChange(name,value)
  {
    let n_inputValuesList1=this.state.inputvaluesList1;
    let n_inputValuesList2=this.state.inputvaluesList2;
    let n_inputValuesList3=this.state.inputvaluesList3;
    console.log(n_inputValuesList1,'n input list1')
    console.log(n_inputValuesList2,'n input list2')
    console.log(n_inputValuesList3,'n input list3')

    if(name.startsWith("submenu1"))
    {

      let inputValues1= {};
      let new_list1=[];
      let documents1=this.state.documents1;
      let inputvaluesList1=[];


      if(n_inputValuesList1!=[] && n_inputValuesList1.length>0)
      {
        if(name in n_inputValuesList1[0])
        {
        inputvaluesList1=[];
        n_inputValuesList1[0][name]=value
        inputValues1[name] = n_inputValuesList1[0][name]
        inputvaluesList1.push(inputValues1)
        }
        else
        {
          inputvaluesList1=[];
          inputValues1[name]=value
          inputvaluesList1.push(inputValues1)
        }
      }
      else
      {
        inputvaluesList1=[];
        inputValues1[name]=value
        inputvaluesList1.push(inputValues1)
      }

      let test1 = inputvaluesList1.concat(n_inputValuesList1)
      if(test1.length>0)
      {
        new_list1.push(test1.reduce(function(acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          }, {}));
      }
      else
      {
        new_list1 = test1
      }

      let commentIndex = documents1.map(function(valueslist)
      {
        if(valueslist['$$typeof']&& valueslist['props']&&'name' in valueslist['props'])
        {
          return valueslist['props'].name;
        }
        else {
          return 'test'
        }
      }).indexOf(name);

      if(commentIndex!==undefined)
      {
        if( commentIndex!=-1)
        {
        let updatedComment = update(documents1[commentIndex], {props:{value: {$set:value}}});
        let newData = update(documents1, {
            $splice: [[commentIndex, 1, updatedComment]]
        });
        this.setState({documents1: newData})
        }
      }

      this.setState({inputValues1: inputValues1 ,inputvaluesList1:new_list1})

     }
    if(name.startsWith("submenu2"))
    {
          let inputValues2= {};
          let new_list2=[];
          let documents2=this.state.documents2;
          let inputvaluesList2=[];


          if(n_inputValuesList2!=[] && n_inputValuesList2.length>0)
          {
            if(name in n_inputValuesList2[0])
            {
              inputvaluesList2=[];
              n_inputValuesList2[0][name]=value
              inputValues2[name] = n_inputValuesList2[0][name]
              inputvaluesList2.push(inputValues2)
            }
            else {
              inputvaluesList2=[];
              inputValues2[name]=value
              inputvaluesList2.push(inputValues2)

            }

        }
         else
         {

            inputvaluesList2=[];
            inputValues2[name]=value
            inputvaluesList2.push(inputValues2)
          }

          let test2 = inputvaluesList2.concat(n_inputValuesList2)
          if(test2.length>0)
          {
            new_list2.push(test2.reduce(function(acc, x) {
                for (var key in x) acc[key] = x[key];
                return acc;
              }, {}));
          }
          else
          {
            new_list2 = test2
          }

          let commentIndex = documents2.map(function(valueslist)
          {
            if(valueslist['$$typeof']&& valueslist['props']&&'name' in valueslist['props'])
            {
              return valueslist['props'].name;
            }
            else {
              return 'test'
            }
          }).indexOf(name);

          if(commentIndex!==undefined)
          {
            if( commentIndex!=-1)
            {
            let updatedComment = update(documents2[commentIndex], {props:{value: {$set:value}}});
            let newData = update(documents2, {
                $splice: [[commentIndex, 1, updatedComment]]
            });
            this.setState({documents2: newData})
            }
          }

          this.setState({inputValues2: inputValues2 ,inputvaluesList2:new_list2})



    }
    if(name.startsWith("submenu3"))
    {
      let inputValues3= {};
      let new_list3=[];
      let documents3=this.state.documents3;
      let inputvaluesList3=[];

      if(n_inputValuesList3!=[] && n_inputValuesList3.length>0)
      {
        if(name in n_inputValuesList3[0])
        {
          inputvaluesList3=[];
          n_inputValuesList3[0][name]=value
          inputValues3[name] = n_inputValuesList3[0][name]
          inputvaluesList3.push(inputValues3)
          inputvaluesList3 = n_inputValuesList3
        }
        else
        {
          inputvaluesList3=[];
          inputValues3[name]=value
          n_inputValuesList3.push(inputValues3)
        }
      }
      else
      {
        inputvaluesList3=[];
        inputValues3[name]=value
        inputvaluesList3.push(inputValues3)
      }
      let test3 = inputvaluesList3.concat(n_inputValuesList3)
      if(test3.length>0)
      {
        new_list3.push(test3.reduce(function(acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          }, {}));
      }
      else
      {
        new_list3 = test3
      }

      let commentIndex = documents3.map(function(valueslist)
      {
        if(valueslist['$$typeof']&& valueslist['props']&&'name' in valueslist['props'])
        {
          return valueslist['props'].name;
        }
        else {
          return 'test'
        }
      }).indexOf(name);

      if(commentIndex!==undefined)
      {
        if( commentIndex!=-1)
        {
          let updatedComment = update(documents3[commentIndex], {props:{value: {$set:value}}});
          let newData = update(documents3, {
              $splice: [[commentIndex, 1, updatedComment]]
          });
          this.setState({documents3: newData})
        }

      }

      this.setState({inputValues3: inputValues3 ,inputvaluesList3:new_list3})
    }
  }


  addElement(event)
   {
      let a=event.target.parentNode
      let b=a.parentNode
      let c=b.parentNode
      let target_id=c.id

      if(target_id==="Menu1_lists")
      {
        let documents1 = this.state.documents1.concat(DocumentInput);
        this.setState({documents1: documents1});
      }
      if(target_id==="Menu2_lists")
      {
        let documents2 = this.state.documents2.concat(DocumentInput);
        this.setState({documents2: documents2});
      }
      if(target_id==="Menu3_lists")
      {
        let documents3 = this.state.documents3.concat(DocumentInput);
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
            // totallist1.splice(sindex,1)
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
              // totallist2.splice(sindex,1)
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
              // totallist3.splice(sindex,1)
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

  getmenuList(index)
  {
    return(this.displaysubmenus(index))
  }


  displaysubmenus(index)
  {
    console.log(this.state.documents1,'from registerasssssss')
    let documents1 = this.state.documents1.map((valueslist,sindex) => {
      console.log(sindex,'sindex')
      if(valueslist['props'])
      {
        for (let [key, value, index] of Object.entries(valueslist)) {
            return(<DocumentInput  index={sindex } removeElement={this.removeElement}  addElement={this.addElement}
                                  name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
            }
      }
      else {
          // let keys = Object.keys(valueslist);
          // let last = keys.slice(-2);
          // console.log( this.state.documents1[this.state.documents1.length - 2].props.name,'lasttttt')
          // console.log(this.state.documents1[this.state.documents1.length -2],'ashagshags')
          // console.log(this.state.documents1,'docuemmtd')
          let lastindex =0;
          if(this.state.documents1[0].props && this.state.documents1[0].props.name!=undefined)
          {
            lastindex = this.state.documents1[0].props.name.slice(-1)[0]
          }
          console.log(lastindex,'lastinds')
          console.log(sindex,'sindexxxxxxxx')
          let totalindex = sindex
          let name = `submenu11-${totalindex}`
          return (<DocumentInput  index={ sindex } removeElement={this.removeElement}  addElement={this.addElement}
                                  dynamictextChange ={this.dynamictextChange} name={name}  />)

      }
    });

    let documents2 = this.state.documents2.map((valueslist,sindex) =>
    {
      if(valueslist['props'])
      {

        for (let [key, value, index] of Object.entries(valueslist)) {

               return(<DocumentInput  index={ sindex } removeElement={this.removeElement}  addElement={this.addElement}
                                  name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
              }
      }
      else
      {
        let lastindex =0;
        if(this.state.documents2[0].props && this.state.documents2[0].props.name!=undefined)
        {
          lastindex= this.state.documents2[0].props.name.slice(-1)[0]

        }

        let totalindex=sindex
        console.log(totalindex,'totalindexxxxx')
        let name = `submenu22-${totalindex}`
        return (<DocumentInput  index={ sindex } removeElement={this.removeElement}  addElement={this.addElement}
                   dynamictextChange ={this.dynamictextChange}  name={name}/>)

      }
    });

      let documents3 = this.state.documents3.map((valueslist,sindex) => {
      if(valueslist['props'])
      {
        for (let [key, value, index] of Object.entries(valueslist)) {


                    return(<DocumentInput  index={sindex } removeElement={this.removeElement}  addElement={this.addElement}
                                  name={valueslist.props.name} dynamictextChange ={this.dynamictextChange} value={valueslist.props.value} />)
              }
      }
      else {
        let lastindex =0;
        if(this.state.documents3[0].props && this.state.documents3[0].props.name!=undefined)
        {
          lastindex = this.state.documents3[0].props.name.slice(-1)[0]
        }
        let totalindex=sindex
        console.log(totalindex,'totalindexxxxx')

        let name = `submenu33-${totalindex}`
        return (<DocumentInput  index={ sindex } removeElement={this.removeElement}  addElement={this.addElement}
                   dynamictextChange ={this.dynamictextChange} name={name}/>)
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
 }



  render() {

    return (
    <div>

           <Main/>
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
//   let users = state.usersReducer
//   let loginReducer = state.loginReducer

//   return {
//       users,loginReducer
//   };

// })(EditUser));
