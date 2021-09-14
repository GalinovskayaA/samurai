import React from "react";
import Friend from "./Friend";
import classes from './Friend.module.css'
import {FriendsType} from "../../redux/FriendsReducer";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";

const Friends = () => {
    const friends = useSelector<StoreStateType, Array<FriendsType>>(state => state.friendPage.friends)
  const friend = friends.map ((f, index) => (
    <Friend key={index} id={f.id} avatar={f.avatar} name={f.name}/>
  ))
    return (
        <div className={classes.friendBlock}>
          { friend }
        </div>
    )
}

export default Friends;