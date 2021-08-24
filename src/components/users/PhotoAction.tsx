import React from "react";
import {UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import Avatar from "../common/avatar";

type PropsType = {
    user: UsersType
    navLink: string
}

const PhotoAction = (
    {
        user, navLink
    }: PropsType
) => {

    return (
        <>
            <NavLink to={navLink + user.id}>
                {user.photos.small ? <img src={user.photos.small} alt={''} width={75}/> : user.photos.big ?
                    <img src={user.photos.big} alt={''} width={75}/> : <Avatar width={75}/>}
            </NavLink>
        </>)
}

export default PhotoAction;