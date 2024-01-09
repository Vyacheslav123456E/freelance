

export interface EventState {
    drawer: boolean;
}
export enum EventActionEnum {
    SET_DRAWER = "SET_DRAWER"
}
export interface SetDrawer {
    type: EventActionEnum.SET_DRAWER;
    payload: boolean;
}
export type EventAction =
    SetDrawer