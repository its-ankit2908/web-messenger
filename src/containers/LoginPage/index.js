import React, { useState,useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { TextField,Button } from "@material-ui/core";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser, signin } from "../../actions";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); 




  const userLogin = (e) => {
    e.preventDefault();
    
    if(email === " "){
      alert("email is Required");
      return;
    }
    if(password === " "){
      alert("Password is Required");
      return;
    }

    const user = {email,password};
      
    dispatch(signin(user));
  }

  if(auth.authenticate){
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form  className="p-2" onSubmit={userLogin} >
            <div className="inputbx w-100">
              <TextField
                className="w-100"
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
              <div className="inputbx">
              <TextField
                className="w-100"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
              <div className="inputbx">
                    <Button type="submit" style={{outline:"none"}} variant="contained" color="primary">Login</Button>
              </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
