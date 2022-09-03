import * as AuthActionCreators from './AuthAC'
import * as MainPageActionCreator from './mainPageAC'
export default {
    ...AuthActionCreators,
    ...MainPageActionCreator,
}