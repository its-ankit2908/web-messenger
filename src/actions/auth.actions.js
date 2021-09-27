import firebase from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  
} from "firebase/auth";
import { getFirestore, collection, addDoc,where,updateDoc,doc,setDoc } from "firebase/firestore";
import { firebaseApp } from "../index";
import { authConstants } from "./constants";

// ! signup action
export const signup = (user) => {
  console.log("action");

  return async (dispatch) => {
    const db = getFirestore(firebaseApp);
    const auth = getAuth();

    dispatch({ type: authConstants.USER_LOGIN_REQUEST });

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const userData = userCredential.user;
        console.log(userData);
        const name = `${user.firstName} ${user.lastName}`;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(async () => {
            // Profile updated!
            // ...
            try {
               
              setDoc(doc(db, "users",`${userData.uid}`), {
                firstName: user.firstName,
                lastName: user.lastName,
                uid: userData.uid,
                createdAt: new Date(),
                isOnline: true,
              }).then(() =>{
                
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: userData.uid,
                  email: userData.email,
                };

                console.log(loggedInUser);

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("user Logged in Successfully");
                dispatch({
                  type: authConstants.USER_LOGIN_SUCCESS,
                  payload: { user: loggedInUser },
                });

              }).catch((error) => {

                console.log("Failed to Login");
                dispatch({
                  type: authConstants.USER_LOGIN_FAILURE,
                  payload: { error: "Failed to login" },
                });

              });

              

              // console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

//! signin action
export const signin = (user) => {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const db = getFirestore(); 

      dispatch({ type: authConstants.USER_LOGIN_REQUEST });
      const { email, password } = user;
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data.user);
           
          updateDoc(doc(db,"users",data.user.uid),{
             isOnline:true
          }).then(() =>{
            
              console.log("user online");

              const name = data.user.displayName.split(" ");
              const firstName = name[0];
              const lastName = name[1];
    
              const loggedInUser = {
                firstName,
                lastName,
                uid: data.user.uid,
                email: data.user.email,
              };
    
              localStorage.setItem("user", JSON.stringify(loggedInUser));
              console.log("user Logged in Successfully");
              dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: { user: loggedInUser },
              });


          }).catch((error) =>{
              console.log(error);
          }); 



        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: authConstants.USER_LOGIN_FAILURE,
            payload: { error: "Failed to Login" },
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

// ! check user logging in or not
export const isLoggedInUser = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: { user },
      });
    } else {
      dispatch({
        type: authConstants.USER_LOGIN_FAILURE,
        payload: { error: "Login Again please" },
      });
    }
  };
};

// ! logout user
export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGOUT_REQUEST });
    const auth = getAuth();
    const db =  getFirestore();

    // collection(db,"users", where('uid','==',uid ))
    updateDoc(doc(db,"users",uid),{
       isOnline: false 
    }).then(() => {
      
      //  console.log("Updated Successfully");

       signOut(auth).then(() =>{
        // success
        localStorage.clear();
        dispatch({type:authConstants.USER_LOGOUT_SUCCESS});
  
      }).catch((error)=>{
            console.log(error);
        dispatch({type:authConstants.USER_LOGOUT_FAILURE ,payload:{error} });
  
      });



    }).catch((error) => {
       console.log(error); 
    })


    
    

  };
};
