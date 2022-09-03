import {MainPageAction, MainPageActionTypes, MainPageState} from "../types/main";

const initialState = {
    links: [],
    shortLink: null,
    order: 'asc_short',
    error: null

}
export const mainPageReducer = (state = initialState, action: MainPageAction): MainPageState => {
    switch (action.type) {
        case MainPageActionTypes.FETCH_LINKS:
            return {...state, links: [...action.payload]}
        case MainPageActionTypes.SET_SHORT_LINK:
            return {...state, shortLink: action.payload}
        case MainPageActionTypes.SET_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}
