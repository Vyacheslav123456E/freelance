import {IUser} from "../../../models/IUser";
import {IOrder} from "../../../models/IOrder";
import {ICategories} from "../../../models/ICategories";
import {ICategoriesCascader} from "../../../models/ICategoriesCascader";

export interface EventState {
    guests: IUser[];
    orders: IOrder[];
    categories: ICategories[];
    categories_cascader: ICategoriesCascader[];
}

export enum EventActionEnum {
    SET_CATEGORIES = "SET_CATEGORIES",
    SET_CATEGORIES_CASCADER= "SET_CATEGORIES_CASCADER"
}

export interface SetCategoriesAction {
    type: EventActionEnum.SET_CATEGORIES;
    payload: ICategories[],
}
export interface SetCategoriesCascaderAction {
    type: EventActionEnum.SET_CATEGORIES_CASCADER;
    payload: ICategoriesCascader[]
}


export type EventAction =
    SetCategoriesAction |
    SetCategoriesCascaderAction