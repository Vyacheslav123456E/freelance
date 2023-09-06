import React from "react";
import Index from "../pages/login";
import Order from '../pages/order';
import {RouteNames} from "./names";
import Addorder from "../pages/order/addorder";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Index}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.ORDERS, exact: true, component: Order},
    {path: RouteNames.ADD_ORDERS, exact: true, component: Addorder}
]