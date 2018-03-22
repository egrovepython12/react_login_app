import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Module extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
      <Main/>
        <h2>Welcome to {this.props.match.params.id} Component</h2>
      </div>
    );
  }
}

// function mapStateToProps(state){
//
//
// }
// export default withRouter(connect(mapStateToProps,{})(Module));

export default Module;
