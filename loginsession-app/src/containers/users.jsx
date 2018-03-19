
import React, { Component } from "react";
import { connect } from "react-redux";
import users from "../components/users";
import {get_user} from "../../actions/User";
import ReactTable from 'react-table'
import 'react-table/react-table.css'


/**
 * initialize class
 * @extends Component
 */

 
class User extends Component {

    /**
     * constructor
     * @param {[type]} props [description]
     */
    constructor (props){
        super(props);
        this.state={"authUser": Authorization.getAuthUser()};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    /**
     * Component after mount
     * @return {[type]} [description]
     */
    componentDidMount() {
        let page=1;
        let rows=10;
        this.props.dispatch(fetchUsersIfNeeded(page, rows));
    }

    /**
     * To handle the submitted the data
     * @param  {[type]} fields [description]
     * @return {[type]}        [description]
     */

    handleSubmit(fields) {
        this.props.dispatch(saveUserDetails(
            fields    
        ));
    }




  


    /**
     * this is a render method
     * @return {[type]} [description]
     */
    render() {
        return (
            <UsersComponent
                users = {this.props.UserData}
                onHandleSubmit = {this.handleSubmit}
                locale = {this.props.Locale}
                location = {this.props.location}
            />
        );
    }
}

/**
 * export class
 * @type {[type]}
 */
export default connect((state) => {
    const UserData = state.setUsersReducer;

    return {
        UserData
    };

})(User);