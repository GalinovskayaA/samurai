import { Dispatch } from "redux";
import {authAPI} from "../api/api";
import {getAuthUserData} from "./AuthReduser";

type AppPropsType = {
  initialized: boolean,
}

const initialState: AppPropsType = {
  initialized: false,
}

export const appReduser = (state: AppPropsType = initialState, action: AppActionType) => {
  switch (action.type) {
    case "INITIALIZED-SUCCESS": {
      return {
        ...state,
        initialized: action.initialized,
      }
    }
    default:
      return state;
  }
};

export type AppActionType = InitializedSuccessACType

export const initializedSuccessAC = (initialized: boolean) => {
  return {
    type: "INITIALIZED-SUCCESS", initialized
  }
}

export const initializeApp = () => (dispatch: Dispatch) => {
  // @ts-ignore
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccessAC(true))
  })
}

export type InitializedSuccessACType = {
  type: "INITIALIZED-SUCCESS",
  initialized: boolean
}



