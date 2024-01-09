import {
    EventActionEnum, isUpdateAction,
    SetCategoriesAction,
    SetCategoriesCascaderAction, SetCountResponseAction,
    SetOrdersAction,
    SetOrdersCountAction, SetResponseAction
} from "./types";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";
import {AppDispatch} from "../../index";
import OrdersService from "../../../api/OrdersService";
import {IOrder} from "../../../models/IOrder";
import {IResponses} from "../../../models/IResponses";

export const OrderActionCreators = {
    setCategories: (payload: ICategories[]): SetCategoriesAction => ({type: EventActionEnum.SET_CATEGORIES, payload}),
    setCategoriesCascader: (payload: ICategoriesCascader[]): SetCategoriesCascaderAction => ({type: EventActionEnum.SET_CATEGORIES_CASCADER, payload}),
    setOrder: (payload: IOrder[]): SetOrdersAction => ({type: EventActionEnum.SET_ORDERS, payload}),
    setOrderCount: (payload: number): SetOrdersCountAction => ({type: EventActionEnum.SET_COUNT, payload}),
    setResponse: (payload: IResponses[]): SetResponseAction => ({type: EventActionEnum.SET_RESPONSE, payload}),
    setCountResponse: (payload: number): SetCountResponseAction => ({type: EventActionEnum.SET_COUNT_RESPONSE, payload}),
    isUpdate: (payload: boolean): isUpdateAction => ({type: EventActionEnum.UPDATE, payload}),

    fetchCategories: () =>  async (dispatch: AppDispatch) => {
        try {
            const categories = localStorage.getItem("categories");
            if (categories === null){
                const response: any = await OrdersService.getCategories();
                localStorage.setItem("categories", JSON.stringify(response))
                dispatch(OrderActionCreators.setCategories(response));
            }else {
                dispatch(OrderActionCreators.setCategories(JSON.parse(categories)));
            }
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
    addOrder: (payload: []) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.addOrder(payload)
            dispatch(OrderActionCreators.setOrder(response));
        } catch (e) {
            console.log(e);
        }
    },
    fetchOrder: () =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getOrder()
            //console.log(response)
            await dispatch(OrderActionCreators.setOrderCount(Number(response.count[0].count)));
            await dispatch(OrderActionCreators.setOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    },
    fetchOrderPagination: (payload: any) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getOrderPagination(payload)
            await dispatch(OrderActionCreators.setOrderCount(Number(response.count[0].count)));
            await dispatch(OrderActionCreators.setOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    },

    addResponse: (payload: {}) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.setResponse(payload)
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    },
    fetchResponse: (payload: number) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getResponse(payload);
            dispatch(OrderActionCreators.setResponse(response.data));
        } catch (e) {console.log(e)}
    },
    countResponses: (payload: number) => async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getCountResponses(payload)
            dispatch(OrderActionCreators.setCountResponse(response.data.count));
        } catch (e) {console.log(e)}
    },

    updateResponses: (payload: {}) => async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.refResponses(payload);
            dispatch(OrderActionCreators.isUpdate(response));
        } catch (e) {console.log(e)}
    },
    addViews: (payload: {}) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.setViews(payload)
        } catch (e) {
            console.log(e);
        }
    },
}