import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { TextField, Button } from "@material-ui/core";
import {useDispatch,useSelector,} from 'react-redux'
import { Redirect } from "react-router-dom";

// !styling
import "./style.css";

import {signup} from '../../actions'
import { toast } from "react-toastify";
import { validateNamespace } from "@firebase/util";
import { ErrorSharp } from "@material-ui/icons";

const RegisterPage = () => {
 
   const auth = useSelector(state => state.auth);
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {btnDisable,isBtnDisabled} = useState(false);
  

  

  const dispatch = useDispatch();

  
  
  // todo: isEmail Function
const isEmail = (emailVal) => {
  var atSymbol = emailVal.indexOf("@");
  if (atSymbol < 1) {
    return false;
  }

  var dot = emailVal.lastIndexOf(".");
  if (dot <= atSymbol + 2) {
    return false;
  }

  if (dot === emailVal.length - 1) {
    //! last mai dot hai ya nhi
    return false;
  }

  return true;
};

  const toastify = (msg) => {
      toast(`${msg}`,{
         
        position:'top-right',
         hideProgressBar:true,
         autoClose:1800,
      });
      
  }

  

   const registerUser = (e) =>{
     e.preventDefault();  


     if(firstName === "" || lastName === "" || email === "" || password === "" ){
           toastify("Please Fill all the fields");
           return ;   
     }else if( lastName.length < 5 ){
           
      toastify("Last Name must contain five alphabets");
      return ;
   }else if(firstName.length < 5){
      toastify("First Name must contain five alphabets");
      return;
   }else if(password.length < 5){
       toastify("Minimum 5 characters or digits are required in Password"); 
       return;
   }else if(!password.includes("@") && !password.includes("*") ){
      toastify("Special Character('@' or '*') required in password");
   } 
   else if(!isEmail(email)){
           
        toastify("Email is not valid");
        return; 

     }else{

      const user = {
        firstName,
        lastName,
        email,
        password,
      }

      // console.log(user); 
     dispatch(signup(user)); 


     } 
     
   }

   
   if(auth.authenticate){
    return <Redirect to="/" />
  }

  return (
    <>
      <Layout>
        <div className="loginContainer">
          <Card>
            <form className="p-2" method="POST" onSubmit={registerUser} >
              <div className="inputbx w-100">
                <TextField
                  className="w-100"
                  label="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="inputbx w-100">
                <TextField
                  className="w-100"
                  label="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="inputbx w-100">
                <TextField
                  className="w-100"
                  label="Email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputbx">
                <TextField
                  className="w-100"
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="inputbx"> */}
                <Button
                  type="submit"
                  style={{ outline: "none" }}
                  variant="contained"
                  color="primary"
                  disabled ={btnDisable}
                >
                  Register
                </Button>
              {/* </div> */}
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
