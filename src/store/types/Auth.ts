export enum AuthActionTypes {
    AUTH_USER = "AUTH_USER",
    AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS",
    AUTH_USER_ERROR = "REGISTER_USER_ERROR",
    SET_IS_MODAL_OPEN = "SET_IS_MODAL_OPEN",
    RESET_ERROR = "RESET_ERROR"
}

export interface AuthSubmitAction {
    type: AuthActionTypes.AUTH_USER
}

export interface AuthSuccessAction {
    type: AuthActionTypes.AUTH_USER_SUCCESS
    payload?: {
        access_token: string
        token_type: string
    }
}

export interface AuthErrorAction {
    type: AuthActionTypes.AUTH_USER_ERROR,
    error: string
}

export interface SetIsModalOpen {
    type: AuthActionTypes.SET_IS_MODAL_OPEN
    isModalOpen: boolean
}

export interface ResetError {
    type: AuthActionTypes.RESET_ERROR
}

export interface AuthState {
    username?: string
    loading: boolean
    isModalOpen: boolean
    error?: null | string | any[]
    authData: {
        access_token: string
        token_type: string
    } | undefined
}

export type AuthAction = AuthSubmitAction | AuthSuccessAction | AuthErrorAction | ResetError | SetIsModalOpen;