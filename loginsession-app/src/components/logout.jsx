import React, { Component } from "react";
import LogoutMain from './logoutmain';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Logout extends Component
{

  componentDidMount()
  {
  	localStorage.clear();

  }

  render() {
    return (
      <div>
      <LogoutMain/>
        <h2>Thank You.</h2>
         <p>Test</p>
      </div>
    );
  }
}

export default Logout;
