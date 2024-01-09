import { routerMiddleware, push } from 'react-router-redux'
import {AuthState} from "../store/reducers/auth/types";
import {useActions} from "../hooks/useActions";
import {AppDispatch} from "../store";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {getStorage} from "../utils";


export function userInfo(dispatch: any) {

    return (next: any) => (action: any) => {
        if (getStorage() === null){
            return next(action);
        }
        return next(action);
    };
}