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
import { get_user } from "../actions/user_actions";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
      menus:{},
      showsubmenustatus1:false,
      showsubmenustatus2:false,
      showsubmenustatus3:false

    }

    this.handlelogout = this.handlelogout.bind(this);
    this.handlemenus = this.handlemenus.bind(this);
    this.getmenus = this.getmenus.bind(this);
    this.showmenus=this.showmenus.bind(this);
    this.hidemenus=this.hidemenus.bind(this);
  }

  componentDidMount()
  {
    // this.setState({showsubmenustatus: false});

  }

  handlelogout()
  {
    this.props.LoginSuccess('',false);
  }

  showmenus(event)
  {
    let a=event.target.parentNode.id

    if(a==="Menu1_list")
    {
      this.setState({showsubmenustatus1: true});
    }
    if(a==="Menu2_list")
    {
      this.setState({showsubmenustatus2: true});
    }
    if(a==="Menu3_list")
    {
      this.setState({showsubmenustatus3: true});
    }
  }

  hidemenus(event)
  {
    let a=event.target.parentNode.id

    if(a==="Menu1_list")
    {
      this.setState({showsubmenustatus1: false});
    }
    if(a==="Menu2_list")
    {
      this.setState({showsubmenustatus2: false});
    }
    if(a==="Menu3_list")
    {
      this.setState({showsubmenustatus3: false});
    }
  }



  getmenus(menus)
  {
    return <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-brand">
                </div>
                <ul className="nav navbar-nav">
                  <li className={window.location.pathname==="/users"?"active":"default"} ><NavLink to="/users">Users</NavLink></li>

                  {menus.map((item, i) =>{
                    if(item.checked && item.text ==="Menu1")
                    {
                      if(item.submenus.length==0)
                      {
                        return <li key={i} className={window.location.pathname===item.url?"active":"default"}>
                              <NavLink to={item.url}>{item.text}</NavLink></li>
                      }
                      else(item.submenus.length>0)
                      {
                        let submenus ='';

                        item.submenus.map(function(valueslist)
                        {
                          let value=Object.values(valueslist);


                          submenus = value.map((smenu) =>{
                                            return <a key={smenu}>{smenu}</a>
                                        });


                        });
                          return <li className={"dropdown "+(window.location.pathname===item.url ? 'active' : 'default')} id={item.text+'_list'} onMouseEnter={this.showmenus} onMouseLeave={this.hidemenus}>
                                          <NavLink to={item.url}>{item.text} <span className="caret"></span></NavLink>
                                              {this.state.showsubmenustatus1?<div className="dropdown-content">
                                                {submenus}
                                              </div>:<div></div>}

                                  </li>
                      }

                    }

                    if(item.checked && item.text ==="Menu2")
                    {
                      if(item.submenus.length==0)
                      {
                        return <li key={i} className={window.location.pathname===item.url?"active":"default"}>
                              <NavLink to={item.url}>{item.text}</NavLink></li>
                      }
                      else(item.submenus.length>0)
                      {
                        let submenus ='';

                        item.submenus.map(function(valueslist)
                        {
                          let value=Object.values(valueslist);


                          submenus = value.map((smenu) =>{
                                            return <a key={smenu}>{smenu}</a>
                                        });


                        });
                          return <li className={"dropdown "+(window.location.pathname===item.url ? 'active' : 'default')} id={item.text+'_list'} onMouseEnter={this.showmenus} onMouseLeave={this.hidemenus}>
                                          <NavLink to={item.url}>{item.text} <span className="caret"></span></NavLink>
                                              {this.state.showsubmenustatus2?<div className="dropdown-content">
                                                {submenus}
                                              </div>:<div></div>}

                                  </li>
                      }

                    }

                    if(item.checked && item.text ==="Menu3")
                    {
                      if(item.submenus.length==0)
                      {
                        return <li key={i} className={window.location.pathname===item.url?"active":"default"}>
                              <NavLink to={item.url}>{item.text}</NavLink></li>
                      }
                      else(item.submenus.length>0)
                      {
                        let submenus ='';

                        item.submenus.map(function(valueslist)
                        {
                          let value=Object.values(valueslist);


                          submenus = value.map((smenu) =>{
                                            return <a key={smenu}>{smenu}</a>
                                        });


                        });
                          return <li className={"dropdown "+(window.location.pathname===item.url ? 'active' : 'default')} id={item.text+'_list'} onMouseEnter={this.showmenus} onMouseLeave={this.hidemenus}>
                                          <NavLink to={item.url}>{item.text} <span className="caret"></span></NavLink>
                                              {this.state.showsubmenustatus3?<div className="dropdown-content">
                                                {submenus}
                                              </div>:<div></div>}

                                  </li>
                      }

                    }


                  }

                  )}

               </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><NavLink to="/logout" onClick={this.handlelogout}><span className="glyphicon glyphicon-log-in"></span> Logout</NavLink></li>
              </ul>
              </div>
            </nav>;

  }

  handlemenus(users)
  {

   let menus=''
   if(users.data!=undefined)
   {
      if(users.data.length>0)
      {
        users.data.map((user,i)=>{
          if(user.email == localStorage.getItem('email'))
          {

            menus=user.menus
            return menus
          }
        });

      }
      else
      {
        let lmenus=''
        if(users.data.email == localStorage.getItem('email'))
        {

          lmenus=users.data.menus
          return (this.getmenus(lmenus))
        }

      }
      return (this.getmenus(menus))


    }

  }



  render()
  {
    if(typeof(localStorage.getItem('token')) !== 'undefined' && localStorage.getItem('token') !== null){
    return (
      <div>
      {this.handlemenus(this.props.users)}
     </div>

    );
  }else{
        return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-brand">
            </div>
              <ul className="nav navbar-nav">
                <li className={window.location.pathname==="/"?"active":"default"} ><NavLink to="/">Home</NavLink></li>
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
}

function mapStateToProps(state){

  return {
      loginReducer: state.loginReducer,
      users:state.usersReducer,

  }
}
export default withRouter(connect(mapStateToProps,{get_user})(Main));


// export default withRouter(connect((state) => {
//   const loginReducer = state.loginReducer
//   return {
//     loginReducer
//   };

// })(Main));
