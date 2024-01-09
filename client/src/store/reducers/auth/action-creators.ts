import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import Utils, {removeStorage, setStorage} from "../../../utils";

export const AuthActionCreators = {
    setUser: (user: IUser[]): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),


    registration: (data: []) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(false));
            const response: any = await UserService.api_registration(data)
            if (response.success === 1) {
                const result: any = await Utils.decrypt(response.data);
                await setStorage(response.data)
                dispatch(AuthActionCreators.setUser(JSON.parse(result)));
                dispatch(AuthActionCreators.setIsAuth(true))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
            return response;
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    },
    login: (data: []) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response: any = await UserService.api_login(data)
            if (response.success === 1) {
                const result: any = await Utils.decrypt(response.data);
                await setStorage(response.data)
                dispatch(AuthActionCreators.setUser(JSON.parse(result)));
                dispatch(AuthActionCreators.setIsAuth(true))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
            return response;
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        await removeStorage()
        dispatch(AuthActionCreators.setUser([]));
        dispatch(AuthActionCreators.setIsAuth(false))
    },
    setAuth: (value: boolean) => async (dispatch: AppDispatch) =>{
        dispatch(AuthActionCreators.setIsAuth(value))
    },

    changingUser: (user: {}) => async (dispatch: AppDispatch) => {
        const response: any = await UserService.fetchChangingUser(user)
    }
}