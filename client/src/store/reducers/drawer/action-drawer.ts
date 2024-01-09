import {EventActionEnum, SetDrawer} from "./types";
import {AppDispatch} from "../../index";


export const DrawerActionCreators = {
    setDrawer: (payload: boolean): SetDrawer => ({type: EventActionEnum.SET_DRAWER, payload}),

    drawer: (open: boolean) =>  async (dispatch: AppDispatch) => {
        await dispatch(DrawerActionCreators.setDrawer(open));
    }
}