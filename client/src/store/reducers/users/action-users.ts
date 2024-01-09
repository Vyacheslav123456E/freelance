import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import Utils, {setStorage} from "../../../utils";
import {AuthActionCreators} from "../auth/action-creators";

export const UsersActionCreators = {

    information: (payload: any) =>  async (dispatch: AppDispatch) => {
        try {
        const response: any = await UserService.updateInformation(payload)
            if (response.success === 1) {
                const result: any = await Utils.decrypt(response.data);
                await setStorage(response.data)
                dispatch(AuthActionCreators.setUser(JSON.parse(result)));
                return true;
            }else {
                return false;
            }
        } catch (e) {
           console.log(e)
        }
    },
    specialization: (payload: any) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await UserService.updateSpecialization(payload)
            if (response.success === 1) {
                const result: any = await Utils.decrypt(response.data);
                await setStorage(response.data)
                dispatch(AuthActionCreators.setUser(JSON.parse(result)));
                return true;
            }else {
                return false;
            }
        }catch (e) {console.log(e)}
    },
    contacts: (payload: []) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await UserService.updateContacts(payload)
            if (response.success === 1) {
                const result: any = await Utils.decrypt(response.data);
                await setStorage(response.data)
                dispatch(AuthActionCreators.setUser(JSON.parse(result)));
                return true;
            }else {
                return false;
            }
        }catch (e) {console.log(e)}
    }
}