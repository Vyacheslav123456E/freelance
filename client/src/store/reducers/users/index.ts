import {EventAction, EventActionEnum, EventState} from "./types";


const initialState: EventState = {
    users: []
}

export default function EventReducer(state = initialState, action: EventAction): EventState {
    switch (action.type) {
        case EventActionEnum.SET_INFORMATION:
            return {...state, users: action.payload}
        case EventActionEnum.SET_SPECIALIZATION:
            return {...state, users: action.payload}
        default:
            return state;
    }
}