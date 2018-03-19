import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Menu1 extends Component {

  render() {
    return (
      <div>
      <Main/>
        <h2>Menu1</h2>
        <p>Welcome to Menu1 Page</p>
 
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
export default withRouter(connect(mapStateToProps,{})(Menu1));

