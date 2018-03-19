import React, { Component } from "react";
import Main from './main';
import {get_user , delete_user} from '../actions/user_actions';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Link,
  HashRouter
} from "react-router-dom";
import EditUser from "../components/editUser";
import { Prompt } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Users extends Component 
{
  constructor()
  {   
    super();
    this.state={
      data:[],
      showComponent: false,
      edituserdata:{},
      loginmenus:[],
      role:localStorage.getItem('role'),
      currentPage: 1,
      todosPerPage: 5,
      menus:{}
    }
    this.showEditUser = this.showEditUser.bind(this);
    this.deleteuser=this.deleteuser.bind(this);
    this.show=this.show.bind(this);
    this.cellButton = this.cellButton.bind(this);
  }
  
  componentDidMount()
  {
    this.props.get_user();

  }

    
  componentWillReceiveProps(nextProps)
  {
    if(nextProps.users){
      this.setState({data:nextProps.users.data});
    }
  }

  //edit the user
  showEditUser(data)
  {
    this.setState({
      showComponent: true,
      edituserdata:data
    });

  }

  //delete the user from user list
  deleteuser(index)
  {
    this.props.delete_user(index);
  }
  


  cellButton(cell, row, enumObject, rowIndex) 
  {
    
      return (
        <div>
          <button type="button" className="btn btn-default btn-sm"  onClick={()=>this.showEditUser(row)}>
            <span className="glyphicon glyphicon-pencil"></span> Edit 
          </button>
          {localStorage.getItem('email')==row.email && localStorage.getItem('role')==row.role?<div>Current User</div>:
            <button type="button" className="btn btn-default btn-sm" onClick={()=>this.deleteuser(row.id)}>
            <span className="glyphicon glyphicon-trash"></span> Delete 
          </button>}
        </div>
       
      )
  }

  //show users component after edit user details based on show compoennet status in editsuer comaponent
  show(status){ 
    this.setState({showComponent:status})
  }

 

  render() {

    
    const tableOptions = {
      prePage: <i className='glyphicon glyphicon-chevron-left' />,
      nextPage: <i className='glyphicon glyphicon-chevron-right' />,
      firstPage: <i className='glyphicon glyphicon-step-backward' />,
      lastPage: <i className='glyphicon glyphicon-step-forward' />
    };


    //Render page number in list by iterating in array

    return (
      <div>
        {this.state.showComponent ?
           <EditUser edituserdata={this.state.edituserdata} show={this.show}/> :
           <div>
           <Main />
            <h4>User Profile </h4>

           
              <BootstrapTable data={ this.state.data } options={ tableOptions } pagination search={true} striped={true} hover={true} exportCSV={true}>
                  <TableHeaderColumn dataField='id' isKey={ true } dataAlign="center" dataSort={true} width="20%" export={true} csvHeader='UserId'>User ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='username' dataAlign="center" dataSort={true} width="20%" export={true} csvHeader='UserName'>username</TableHeaderColumn>
                  <TableHeaderColumn dataField='email' dataAlign="center" dataSort={true} width="20%" export={true}csvHeader='Email'>Email</TableHeaderColumn>
                  <TableHeaderColumn dataField='role'dataAlign="center" dataSort={true} width="20%" export={true} csvHeader='Rol'>Role</TableHeaderColumn>
                  <TableHeaderColumn dataField="button" dataFormat={this.cellButton} export={false} >Buttons</TableHeaderColumn>

              </BootstrapTable>
            </div> 
        }
        
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

export default withRouter(connect(mapStateToProps,{get_user,delete_user})(Users));


// export default withRouter(connect((state) => {
//   const loginReducer = state.loginReducer
//   const users = state.usersReducer

//   return {
//     loginReducer, users
//   };

// })(Users));
