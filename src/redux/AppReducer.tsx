import {Dispatch} from "redux";
import {getAuthUserData} from "./AuthReducer";

type AppPropsType = {
    initialized: boolean,
}

const initialState: AppPropsType = {
    initialized: false,
}

export const appReducer = (state = initialState, action: AppActionType): AppPropsType => {
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

export const initializedSuccessAC = (initialized: boolean) => {
    return {
        type: "INITIALIZED-SUCCESS", initialized
    }
}

export const initializeApp = () => (dispatch: ThunkDispatch) => {
    // @ts-ignore
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAC(true))
        })
        .catch((error) => {
                alert(error.message)
            }
        )
}

export type AppActionType = ReturnType<typeof initializedSuccessAC>

type ThunkDispatch = Dispatch<AppActionType>

