import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import {mainPageReducer} from "./mainPage-reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    mainPage: mainPageReducer
})
export type RootState = ReturnType<typeof rootReducer>