import {IUser} from "../../../models/IUser";
import {IOrder} from "../../../models/IOrder";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";

export interface EventState {
    guests: IUser[];
    orders: IOrder[];
    categories: ICategories[];
    categories_cascader: ICategoriesCascader[];
    count: number;
}

export enum EventActionEnum {
    SET_CATEGORIES = "SET_CATEGORIES",
    SET_CATEGORIES_CASCADER = "SET_CATEGORIES_CASCADER",
    SET_ORDERS = "SET_ORDERS",
    SET_COUNT = "SET_COUNT"
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

export type EventAction =
    SetCategoriesAction |
    SetCategoriesCascaderAction |
    SetOrdersAction |
    SetOrdersCountAction