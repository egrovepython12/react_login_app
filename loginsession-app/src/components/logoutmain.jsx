import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Link,
  HashRouter
} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class LogoutMain extends Component {

   constructor(props) {
    super(props)
   
    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout()
  {
    this.props.LoginSuccess('',false);
  }

   render() 
  {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-brand">
            </div>
              <ul className="nav navbar-nav">
                <li className={window.location.pathname.indexOf("/")>-1?"active":"default"} ><NavLink to="/">Home</NavLink></li>
             </ul>
        <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</NavLink></li>
            <li><NavLink to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>
        </ul>
          </div>
      </nav>
      </div>
    );
  }
  
}

function mapStateToProps(state){
  
  return {
      loginReducer: state.loginReducer,
  }
}
export default withRouter(connect(mapStateToProps,{})(LogoutMain));

