const initialState = {
    schedule: [],
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SAVE_CURRENT_SCHEDULE':
            return {
                ...state,
                schedule: action.currentSchedule,
            }
        default:
            return state;
    }
};

export default reducer;