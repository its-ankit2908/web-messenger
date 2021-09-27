import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink,Link } from 'react-router-dom';

import {useSelector,useDispatch} from 'react-redux'


import './style.css'
import { logout } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar(props) {

  const classes = useStyles();
  // const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const auth = useSelector(state => state.auth); 
  const dispatch = useDispatch();
  
  const logoutUser = () =>{
    
    setAnchorEl(null);    
    dispatch(logout(auth.uid));      

  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (

    <div className={classes.root}>


      <AppBar position="static"  >
        <Toolbar>
          <IconButton onClick={props.onClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          {
              auth.authenticate ? (<>Web Messenger <span style={{fontSize:'16px',paddingLeft:'30px' }} >{`Hii ${auth.firstName}`}</span></>):("Web Messenger")
          }
            
          </Typography>

          {
            auth.authenticate ? (
            <div>
              
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </div>
          ):(
             <>
                <div>
                    <ul className="leftMenu">
                        <li><NavLink to="/login" >Login</NavLink></li>
                        <li><NavLink to="/signup" >Signup</NavLink></li>
                    </ul>
                </div>
             </>
          )
          }
        </Toolbar>
      </AppBar>

    </div>
  );
}