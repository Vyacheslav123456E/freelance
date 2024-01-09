import {AuthActionCreators} from "./auth/action-creators";
import {OrderActionCreators} from "./order/action-creators";
import {DrawerActionCreators} from "./drawer/action-drawer";
import {UsersActionCreators} from "./users/action-users";

export const allActionCreators = {
    ...AuthActionCreators,
    ...OrderActionCreators,
    ...DrawerActionCreators,
    ...UsersActionCreators
}