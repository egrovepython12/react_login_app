import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
//import App from '../App';
import { connect } from 'react-redux';

class PublicRoute extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {

      const {authenticated, component: Component, ...rest } = this.props;
      
      return (
         <Route {...rest} render={props => (
            authenticated ? (
                <Redirect to={{
                  pathname: '/users',
                  state: { from: props.location }
               }}/>
                 
                
            ) : (
                <Component {...props}/>
            )
         )}/>
      );
   }
}

PublicRoute.propTypes = {
   authenticated: PropTypes.bool
};

const mapStateToProps = state => {
   const user = localStorage.getItem("username")

   return {
      authenticated: user
   }
};

export default connect(mapStateToProps)(PublicRoute);