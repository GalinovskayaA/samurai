import {getAuthUserDataTC} from './AuthReducer'
import {BaseThunkType} from "./redux-store";

type AppPropsType = {
    initialized: boolean
}

const initialState: AppPropsType = {
    initialized: false
}

export const appReducer = (state = initialState, action: AppActionType): AppPropsType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED-SUCCESS': {
            return {
                ...state,
                initialized: action.initialized,
            }
        }
        default:
            return state;
    }
};

// ----- Actions -----

export const initializedSuccessAC = (initialized: boolean) => {
    return {
        type: 'SN/APP/INITIALIZED-SUCCESS', initialized
    } as const
}

// ----- Thunk -----

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserDataTC())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAC(true))
        })
        .catch((error) => {
                console.error(error.message)
            }
        )
}

// ----- Types -----

export type AppActionType = ReturnType<typeof initializedSuccessAC>
type ThunkType = BaseThunkType<AppActionType>

