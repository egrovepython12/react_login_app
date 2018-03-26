import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "../components/home";
import Register from "../components/register";
import Login from "../components/login";
import Users from "../components/users";
import Logout from "../components/logout";
import EditUser from "../components/editUser";
import Menu1 from "../components/menu1";
import Menu2 from "../components/menu2";
import Menu3 from "../components/menu3";
import PrivateRoute from "../routes/privateroute";
import PublicRoute from "../routes/publicroute";
import BasicTable from "../components/test";
import Module from "../components/module";
import SortableComponent from "../components/dragmenu";


class Routing extends Component {
  render() {

    return (
      <BrowserRouter>
        <Switch>
            <PublicRoute exact path="/" component={Home}/>
            <PublicRoute exact path="/drag" component={SortableComponent}/>
            <PublicRoute exact path="/register" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            <PublicRoute exact path="/test" component={BasicTable}/>
            <PrivateRoute exact path="/users" component={Users}/>
            <PrivateRoute exact path="/logout" component={Logout}/>
            <PrivateRoute exact path="/menu1" component={Menu1}/>
            <PrivateRoute exact path="/menu2" component={Menu2}/>
            <PrivateRoute exact path="/menu3" component={Menu3}/>
            <PrivateRoute exact={true} path="/:id" component={Module}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routing;
