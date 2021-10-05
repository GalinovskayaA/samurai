import React from 'react';
import s from './nav.module.css';
import NavBar from "./NavBar";
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";


const Nav = () => {
    return <nav className={`col ${s.nav}`}>
        <NavLink to={PATH.PROFILE} activeClassName={s.activeLink}> <NavBar name={"Profile"}/> </NavLink>
        <NavLink to={PATH.MESSAGES} activeClassName={s.activeLink}> <NavBar name={"Message"}/> </NavLink>
        <NavLink to={PATH.CHAT} activeClassName={s.activeLink}> <NavBar name={"Chat"}/> </NavLink>
        <NavLink to={PATH.USERS} activeClassName={s.activeLink}> <NavBar name={"Users"}/> </NavLink>
    </nav>
}

export default Nav;
