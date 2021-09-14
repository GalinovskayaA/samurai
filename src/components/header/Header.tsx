import React from 'react';
import s from './header.module.css';
import logo from "./../../image/logo.png"
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from "./HeaderContainer";


const Header = (props: HeaderContainerPropsType) => {
    return <header className={s.header}>
        <img src={logo} alt="logo"/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logoutTC}> Log out </button></div>
                : <NavLink to={'login'}> Login </NavLink>}
        </div>
    </header>
}

export default Header;
