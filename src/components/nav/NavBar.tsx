import React from 'react';
import classes from './nav.module.css';

type NavBarType = {
  name: string
}

const NavBar = (props: NavBarType) => {

  return <div className={classes.item}>
    {props.name}
  </div>
}

export default NavBar;
