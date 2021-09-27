import React,{useEffect} from "react"; 

// !styling
import "./App.css";
import './bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// !containers and components
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";


import {useDispatch,useSelector} from 'react-redux'
import { isLoggedInUser } from "./actions";
import { ToastContainer } from "react-toastify";

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
     
    if(!auth.authenticate){ 
        dispatch(isLoggedInUser()); 
    }
   
 }, []);

  return (
    <>
     <ToastContainer/>
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={HomePage} />
          <Route path="/test" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;
