// action type
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// action function
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = 0;

// reducer
export default function counter(
    state = initialState,
    action: any
) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
