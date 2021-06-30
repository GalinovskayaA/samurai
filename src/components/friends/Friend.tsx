import React from 'react';
import classes from './Friend.module.css'
import {FriendsType} from "../../redux/FriendsReduser";


const Friend = (props: FriendsType) => {

  return (
  <div className={classes.friendItem}>
    {props.name}
    <img src={props.avatar} alt={''}/>
  </div>
  );
}

export default Friend;
