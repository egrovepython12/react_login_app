import React, { Component } from "react";
import Main from './main';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";


class Module extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    debugger;
    // console.log(this.props.location.pathname,'props data')
    // this.state = {
    //   "pathvalue":""
    //
		// }
  }
  //
  // componentDidMount()
  // {
  //   let path =this.props.location.pathname;
  //   let pathvalue= path.split("/").slice(-1)[0];
  //   this.setState({"pathvalue":pathvalue})
  // }

  render() {
    return (
      <div>
      <Main/>
        <h2>Welcome to {this.props.match.params.id} Compoenent</h2>
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
