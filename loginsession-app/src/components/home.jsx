import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Home extends Component {

  render() {
    return (
      <div>
      <Main/>
        <h2>HELLO</h2>
        <p>Welcome to Home Page</p>
 
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
export default withRouter(connect(mapStateToProps,{})(Home));

// export default  withRouter (connect((state) => {
//   const loginReducer = state.loginReducer
  
//   return {
//       loginReducer
//   };

// })(Home));
