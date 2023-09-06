import {EventActionEnum, SetCategoriesAction, SetCategoriesCascaderAction} from "./types";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";
import {AppDispatch} from "../../index";
import OrdersService from "../../../api/OrdersService";

export const OrderActionCreators = {
    setCategories: (payload: ICategories[]): SetCategoriesAction => ({type: EventActionEnum.SET_CATEGORIES, payload}),
    setCategoriesCascader: (payload: ICategoriesCascader[]): SetCategoriesCascaderAction => ({type: EventActionEnum.SET_CATEGORIES_CASCADER, payload}),

    fetchCategories: () =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getCategories()
            dispatch(OrderActionCreators.setCategories(response));
        } catch (e) {
            console.log(e);
        }
    },
    fetchCategoriesCascader: () =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getCategoriesCascader()
            dispatch(OrderActionCreators.setCategoriesCascader(response));
        } catch (e) {
            console.log(e);
        }
    },
}