import React from 'react';
import s from './nav.module.css';

type NavBarType = {
  name: string
}

const NavBar = (props: NavBarType) => {

  return <div className={s.item}>
    {props.name}
  </div>
}

export default NavBar;
