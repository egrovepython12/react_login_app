import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Menu2 extends Component {

  render() {
    return (
      <div>
      <Main/>
        <h2>Menu2</h2>
        <p>Welcome to Menu2 Page</p>
 
        <p>Test</p>
      </div>
    );
  }
}
 
function mapStateToProps(state){
 
  return {
      loginReducer: state.loginReducer,
  }
}
export default withRouter(connect(mapStateToProps,{})(Menu2));

