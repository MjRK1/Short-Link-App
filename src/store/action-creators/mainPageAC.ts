import {MainPageAction, MainPageActionTypes} from "../types/main";
import {Dispatch} from "redux";
import {linksAPI} from "../../api/api";

export const fetchLinks = (order: string, access_token: string, token_type: string) => {
    return async (dispatch: Dispatch<MainPageAction>) => {
        try {
            const response = await linksAPI.fetchLinks(order, access_token, token_type);
            dispatch({type: MainPageActionTypes.FETCH_LINKS, payload: response.data})
            dispatch({type: MainPageActionTypes.SET_ERROR, payload: null})
        } catch (e: any) {
            dispatch({type: MainPageActionTypes.SET_ERROR, payload: e.response.data.detail})
        }
    }
}
export const getShortLink = (target: string, access_token: string, token_type: string) => {
    return async (dispatch: Dispatch<MainPageAction>) => {
        try {
            const response = await linksAPI.getShortLink(target, access_token, token_type);
            dispatch({type: MainPageActionTypes.SET_SHORT_LINK, payload: response.data.short})
            dispatch({type: MainPageActionTypes.SET_ERROR, payload: null})
        } catch (e: any) {
            console.log(e)
            if (e.response.status == 401) {
                dispatch({type: MainPageActionTypes.SET_ERROR, payload: e.response.data.detail})
            } else {
                dispatch({type: MainPageActionTypes.SET_ERROR, payload: e.response.data.detail[0]?.msg})
            }
        }
    }
}
export const resetMainPageError = () => {
    return (dispatch: Dispatch<MainPageAction>) => {
        dispatch({type: MainPageActionTypes.SET_ERROR, payload: null})
    }
}

