
export interface EventState {
    users: [];
}
export enum EventActionEnum {
    SET_INFORMATION = "SET_INFORMATION",
    SET_SPECIALIZATION = "SET_SPECIALIZATION"
}
export interface SetInformation {
    type: EventActionEnum.SET_INFORMATION;
    payload: [];
}
export interface SetSpecialization {
    type: EventActionEnum.SET_SPECIALIZATION;
    payload: [];
}
export type EventAction =
    SetInformation |
    SetSpecialization