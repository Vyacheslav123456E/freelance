import {
    EventActionEnum,
    SetCategoriesAction,
    SetCategoriesCascaderAction,
    SetOrdersAction,
    SetOrdersCountAction
} from "./types";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";
import {AppDispatch} from "../../index";
import OrdersService from "../../../api/OrdersService";
import {IOrder} from "../../../models/IOrder";

export const OrderActionCreators = {
    setCategories: (payload: ICategories[]): SetCategoriesAction => ({type: EventActionEnum.SET_CATEGORIES, payload}),
    setCategoriesCascader: (payload: ICategoriesCascader[]): SetCategoriesCascaderAction => ({type: EventActionEnum.SET_CATEGORIES_CASCADER, payload}),
    setOrder: (payload: IOrder[]): SetOrdersAction => ({type: EventActionEnum.SET_ORDERS, payload}),
    setOrderCount: (payload: number): SetOrdersCountAction => ({type: EventActionEnum.SET_COUNT, payload}),

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
            await dispatch(OrderActionCreators.setOrderCount(Number(response.count[0].count)));
            await dispatch(OrderActionCreators.setOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    },
    fetchOrderId: (id: number) =>  async (dispatch: AppDispatch) => {
        const response: any = await OrdersService.getOrderId(id)
        await dispatch(OrderActionCreators.setOrder(response.data));
    },
    fetchOrderPagination: (payload: any) =>  async (dispatch: AppDispatch) => {
        try {
            const response: any = await OrdersService.getOrderPagination(payload)
            await dispatch(OrderActionCreators.setOrderCount(Number(response.count[0].count)));
            await dispatch(OrderActionCreators.setOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}