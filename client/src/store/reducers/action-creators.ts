import {AuthActionCreators} from "./auth/action-creators";
import {OrderActionCreators} from "./order/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...OrderActionCreators
}