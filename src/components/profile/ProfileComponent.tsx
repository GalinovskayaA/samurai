import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";
import {getUserProfileTC, setStatusTC} from "../../redux/ProfileReducer";
import {StoreStateType} from "../../redux/redux-store";
import {useParams, Redirect} from 'react-router-dom';
import Preloader from "../common/Preloader";
import {AuthPropsType} from "../../redux/AuthReducer";
import useGaTracker from "../../useGaTracker";


export const ProfileComponent = () => {
    useGaTracker()
    let dispatch = useDispatch()
    const user = useSelector<StoreStateType, AuthPropsType>(state => state.auth)
    const isFetching = useSelector<StoreStateType, boolean>(state => state.profilePage.isFetching)
    let {userId} = useParams<{ userId?: string | undefined }>()
    const meId = useRef((user.id.toString()))

    useEffect(() => {
        if (!userId) {
            dispatch(getUserProfileTC(meId.current))
            dispatch(setStatusTC(meId.current))
        } else {
            dispatch(getUserProfileTC(userId))
            dispatch(setStatusTC(userId))
        }
    }, [dispatch, userId, user])

    if (!user.isAuth && !userId) return <Redirect to={'/login'}/>
    return (
        <>
            <div>{isFetching && <Preloader/>}</div>
            <Profile isOwner={!userId}/>
        </>
    )
}