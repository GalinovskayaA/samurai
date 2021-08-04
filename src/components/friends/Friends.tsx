import React from "react";
import Friend from "./Friend";
import classes from './Friend.module.css'
import {FriendsPropsType} from "../../redux/FriendsReducer";

const Friends = (props: FriendsPropsType) => {
  const friend = props.friend.map ((f) => (
    <Friend key={f.id} id={f.id} avatar={f.avatar} name={f.name}/>
  ))
    return (
        <div className={classes.friendBlock}>
          { friend }
        </div>
    )
}

export default Friends;