import React from "react";
import Index from "../pages/login";
import Order from '../pages/order';
import {RouteNames} from "./names";
import Addorder from "../pages/order/addorder";
import OrderId from "../pages/order/orderId";
import Registration from "../pages/login/registration";
import Profile from '../pages/profile';
import Account from '../pages/account';
import CurrentId from "../pages/account/responses/currentId";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Index},
    {path: RouteNames.REGISTRATION, exact: true, component: Registration}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Index},
    {path: RouteNames.REGISTRATION, exact: true, component: Registration},
    {path: RouteNames.ORDERS, exact: true, component: Order},
    {path: RouteNames.ADD_ORDERS,  component: Addorder},
    {path: RouteNames.ORDER_ID,  component: OrderId},
    {path: RouteNames.PROFILE,  component: Profile},
    {path: RouteNames.PERSONAL_ACCOUNT,  component: Account},
    {path: RouteNames.CURRENTID,  component: CurrentId},
]