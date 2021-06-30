import React from 'react';
import classes from './nav.module.css';
import NavBar from "./navBar";
import {NavLink} from "react-router-dom";
import Friends from "../friends/Friends";
import {FriendsPropsType} from "../../redux/FriendsReduser";

export type NavType = {
  friendsProps: FriendsPropsType
}

const Nav = (props: NavType) => {

  return <nav className={classes.nav}>
    <NavLink to="/Profile" activeClassName={classes.activeLink}> <NavBar name={"Profile"} /> </NavLink>
    <NavLink to="/Dialogs" activeClassName={classes.activeLink}> <NavBar name={"Message"} /> </NavLink>
    <NavLink to="/News" activeClassName={classes.activeLink}> <NavBar name={"News"} /> </NavLink>
    <NavLink to="/Music" activeClassName={classes.activeLink}> <NavBar name={"Music"} /> </NavLink>
    <NavLink to="/Setting" activeClassName={classes.activeLink}> <NavBar name={"Setting"} /> </NavLink>
    <NavLink to="/Users" activeClassName={classes.activeLink}> <NavBar name={"Users"} /> </NavLink>
    <NavLink to="/Friend" activeClassName={classes.activeLink}> <Friends friend={props.friendsProps.friend}/> </NavLink>
  </nav>
}

export default Nav;
