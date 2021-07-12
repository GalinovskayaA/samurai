import React, {ChangeEvent, useEffect, useState} from "react";
import {StoreStateType} from "../../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfileTC, updateStatusTC} from "../../../redux/ProfileReduser";


const ProfileStatusWithHooks = () => {
  let dispatch = useDispatch();
  let statusUser = useSelector<StoreStateType, string>(state => state.profilePage.status)
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(statusUser);

  useEffect(() => {
    dispatch(getUserProfileTC)
    setStatus(statusUser)
  }, [statusUser, dispatch])

  let activateEditMode = () => {
    setEditMode(true);
  }
  let deactivateEditMode = (status: string) => {
    setEditMode(false);
    dispatch(updateStatusTC(status))
  }
  let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value)
  }

  return <div>
    { !editMode &&
    <div>
      <b>Status:</b> <span onDoubleClick={ activateEditMode }> {statusUser || "No status"} </span>
    </div>}

      {editMode &&
        <div>
          <input onChange={ onStatusChange } autoFocus onBlur={ ()=>deactivateEditMode(status) } value={status}/>
        </div>
      }
    </div>
  }

export default ProfileStatusWithHooks;