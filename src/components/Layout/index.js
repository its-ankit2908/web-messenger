import React, { useState } from "react";
import Header from "../Header";

const Layout = (props) => {
  

  

  return (
    <>
      <Header onClick={props.toggleSideBar}  />
      {props.children}
    </>
  );
};


export default Layout;