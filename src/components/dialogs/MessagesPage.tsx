import React, {useEffect} from "react";
import s from "./Dialogs.module.css"
import DialogsMessages from "./DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {followTC, getUsersTC, unfollowTC} from "../../redux/UsersReducer";
import {StoreStateType} from "../../redux/redux-store";
import User from "../users/User";
import PhotoAction from "../users/PhotoAction";
import {getAllDialogsTC, getFriendMessagesTC, startDialogAC} from "../../redux/DialogsReducer";
import {Redirect, useParams} from "react-router-dom";


const MessagesPage = () => {
    let dispatch = useDispatch()
    let {userId} = useParams<{ userId?: string | undefined }>()
    console.log(userId)
    const {
        pageSize, currentPage, followingInProgress, users
    } = useSelector((state: StoreStateType) => state.usersPage)
    const {
        isStartDialog, messageData, page, count
    } = useSelector((state: StoreStateType) => state.dialogPage)
    const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getUsersTC(1, 100, {term: '', friend: true}))
        dispatch(getAllDialogsTC())
        return function cleanUp() {
            dispatch(startDialogAC(false))
        }
    },[dispatch])

    /*const dialogsElements = props.dialogsData.map((d) => (<DialogItem key={d.id} id={d.id} name={d.name}/>))*/
    const follow = (usersID: string) => {
        dispatch(followTC(usersID))
    }
    const unfollow = (usersID: string) => {
        dispatch(unfollowTC(usersID))
    }
    const startDialog = (usersID: string, page: number, count: number) => {
        dispatch(startDialogAC(true))
        dispatch(getFriendMessagesTC(Number(usersID), page, count))
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogsContent}>
            <div className={s.dialogItems}> {/*имена друзей*/}
                {users.map((u, index) => <div>
                    <PhotoAction key={index} navLink={'/dialogs/'} user={u}/>
                    <User user={u} key={u.id} followingInProgress={followingInProgress}
                                           follow={follow} unfollow={unfollow} startDialog={startDialog} page={page} count={count} navLink={'/dialogs/'}/></div>)}
            </div>
            {isStartDialog && <div className={s.messages}>
                <DialogsMessages /> {/*диалоговая часть*/}
            </div>}
        </div>
    )
}

export default MessagesPage