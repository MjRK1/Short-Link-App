import {AuthAction, AuthActionTypes} from '../types/Auth'
import {Dispatch} from "redux";
import {authAPI} from "../../api/api";
import {resetMainPageError} from "./mainPageAC";

export function setIsModalOpen(isModalOpen: boolean) {
    return (dispatch: Dispatch<AuthAction>) =>
        dispatch({type: AuthActionTypes.SET_IS_MODAL_OPEN, isModalOpen})
}

export function resetAuthError() {
    return (dispatch: Dispatch<AuthAction>) => dispatch({type: AuthActionTypes.RESET_ERROR})
}

export const signIn = (username: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            resetAuthError()
            resetMainPageError()
            const response = await authAPI.signIn(username, password)
            dispatch({type: AuthActionTypes.AUTH_USER_SUCCESS, payload: response.data.username})
        } catch (e: any) {
            dispatch({type: AuthActionTypes.AUTH_USER_ERROR, error: e.response.data.detail})
        }
    }
}
export const logIn = (username: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            resetAuthError();
            dispatch({type: AuthActionTypes.AUTH_USER})
            const response = await authAPI.login(username, password)
            dispatch({type: AuthActionTypes.AUTH_USER_SUCCESS, payload: response.data})
        } catch (e: any) {
            dispatch({type: AuthActionTypes.AUTH_USER_ERROR, error: e.response.data.detail})
        }
    }
}