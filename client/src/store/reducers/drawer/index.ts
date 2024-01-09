import {EventState} from "./types";
import {EventAction, EventActionEnum} from "./types";


const initialState: EventState = {
    drawer: true
}
export default function EventReducer(state = initialState, action: EventAction): EventState {
    switch (action.type) {
        case EventActionEnum.SET_DRAWER:
            return {...state, drawer: action.payload}
        default:
            return state;
    }
}