import React from 'react';
import classes from './nav.module.css';
import NavBar from "./NavBar";
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";
import Friends from "../friends/Friends";


const Nav = () => {
    return <nav className={classes.nav}>
        <NavLink to={PATH.PROFILE} activeClassName={classes.activeLink}> <NavBar name={"Profile"}/> </NavLink>
        <NavLink to={PATH.MESSAGES} activeClassName={classes.activeLink}> <NavBar name={"Message"}/> </NavLink>
        <NavLink to={PATH.CHAT} activeClassName={classes.activeLink}> <NavBar name={"Chat"}/> </NavLink>
        <NavLink to={PATH.NEWS} activeClassName={classes.activeLink}> <NavBar name={"News"}/> </NavLink>
        <NavLink to={PATH.MUSIC} activeClassName={classes.activeLink}> <NavBar name={"Music"}/> </NavLink>
        <NavLink to={PATH.SETTING} activeClassName={classes.activeLink}> <NavBar name={"Setting"}/> </NavLink>
        <NavLink to={PATH.USERS} activeClassName={classes.activeLink}> <NavBar name={"Users"}/> </NavLink>
        <NavLink to={PATH.FRIENDS} activeClassName={classes.activeLink}> <Friends/> </NavLink>
    </nav>
}

export default Nav;
