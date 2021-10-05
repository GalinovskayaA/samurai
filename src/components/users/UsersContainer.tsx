import React from "react";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import Preloader from "../common/Preloader";
import {Users} from "./Users";

export const UsersPageComponent = () => {
    const isFetching = useSelector<StoreStateType, boolean>(state => state.usersPage.isFetching)

    return <>
        <div className={`${!isFetching && 'transparent'}`}>
            <Preloader/>
        </div>
        <Users/>
    </>
}