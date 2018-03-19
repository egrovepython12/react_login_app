import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './routes/routes';
import reducer from "./reducers/index";
import { Provider } from "react-redux";
import {
	BrowserRouter,
	Route,
	Switch,
  	NavLink,
  	HashRouter
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import { createLogger } from 'redux-logger'

const middleware = [thunk];
middleware.push(createLogger())


const store = createStore(
 reducer,
 applyMiddleware(...middleware)
);

const render = ()=>ReactDOM.render(
	<Provider store={store}> 
		<Routing/>
	</Provider>, 
	document.getElementById("root")
);
render();
