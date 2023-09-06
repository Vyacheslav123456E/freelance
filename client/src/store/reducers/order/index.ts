import {EventAction, EventActionEnum, EventState} from "./types";


const initialState: EventState = {
    orders: [],
    guests: [],
    categories: [],
    categories_cascader: []
}

export default function EventReducer(state = initialState, action: EventAction): EventState {
    switch (action.type) {
        case EventActionEnum.SET_CATEGORIES:
            return {...state, categories: action.payload}
        case EventActionEnum.SET_CATEGORIES_CASCADER:
            return {...state, categories_cascader: action.payload}
        default:
            return state;
    }
}