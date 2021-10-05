import React from 'react';
import s from './header.module.css';
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from "./HeaderContainer";


const Header = (props: HeaderContainerPropsType) => {
    return <header className={`row ${s.header}`}>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.logoutTC} className="offset-l"> Log out </button></div>
                : <NavLink to={'login'}> Login </NavLink>}
        </div>
    </header>
}

export default Header;
