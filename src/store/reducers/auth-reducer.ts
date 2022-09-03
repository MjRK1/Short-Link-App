import {AuthAction, AuthActionTypes, AuthState} from "../types/Auth";

const initialState = {
    username: '',
    loading: false,
    isModalOpen: false,
    error: null,
    authData: {
        access_token: '',
        token_type: ''
    }

}
export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_USER: {
            return {...state, loading: true, error: null}
        }
        case AuthActionTypes.AUTH_USER_SUCCESS:
            return {...state, loading: false, authData: action.payload, error: null}
        case AuthActionTypes.AUTH_USER_ERROR:
            return {...state, loading: false, error: action.error}
        case AuthActionTypes.SET_IS_MODAL_OPEN:
            return {...state, isModalOpen: action.isModalOpen}
        case AuthActionTypes.RESET_ERROR:
            return {...state, error: null}
        default:
            return state
    }
}

