import {IUser} from "../../../models/IUser";
import {IOrder} from "../../../models/IOrder";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";
import {IResponses} from "../../../models/IResponses";

export interface EventState {
    guests: IUser[];
    orders: IOrder[];
    categories: ICategories[];
    categories_cascader: ICategoriesCascader[];
    count: number;
    response: IResponses[];
    countResponse: number;
    isUpdate: boolean;
}

export enum EventActionEnum {
    SET_CATEGORIES = "SET_CATEGORIES",
    SET_CATEGORIES_CASCADER = "SET_CATEGORIES_CASCADER",
    SET_ORDERS = "SET_ORDERS",
    SET_COUNT = "SET_COUNT",
    SET_RESPONSE = "SET_RESPONSE",
    SET_COUNT_RESPONSE = "SET_COUNT_RESPONSE",
    UPDATE = "UPDATE"
}

export interface SetCategoriesAction {
    type: EventActionEnum.SET_CATEGORIES;
    payload: ICategories[];
}
export interface SetCategoriesCascaderAction {
    type: EventActionEnum.SET_CATEGORIES_CASCADER;
    payload: ICategoriesCascader[];
}
export interface SetOrdersAction {
    type: EventActionEnum.SET_ORDERS;
    payload: IOrder[];
}
export interface SetOrdersCountAction {
    type: EventActionEnum.SET_COUNT;
    payload: number;
}
export interface SetResponseAction {
    type: EventActionEnum.SET_RESPONSE;
    payload: IResponses[];
}
export interface SetCountResponseAction {
    type: EventActionEnum.SET_COUNT_RESPONSE;
    payload: number;
}
export interface isUpdateAction {
    type: EventActionEnum.UPDATE;
    payload: boolean;
}
export type EventAction =
    SetCategoriesAction |
    SetCategoriesCascaderAction |
    SetOrdersAction |
    SetOrdersCountAction |
    SetResponseAction |
    SetCountResponseAction |
    isUpdateAction