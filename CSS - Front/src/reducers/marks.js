const initialState = {
    userList: [],
    discipline: [],
    grade: [],
    average:[],
    content: '',
    marksListByClassroom: [],
    marksList:[]
  };
  

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SAVE_CURRENT_MARKS':
            return {
                ...state,
                grade: action.currentMarks,
                discipline: action.currentMeasures,
                average: action.currentAverages,
            }
            case 'SAVE_RESOURCE':
            return {
                ...state,
                resourcesList: action.resource,
            };
            case 'SAVE_CLASSROOM_MARKS':
                return {
                    ...state,
                    marksListByClassroom: action.marksList,
                }
            case 'SAVE_MARKS_LIST':
                return {
                    ...state,
                    marksList: action.marksList,
                }
        default:
            return state;
    }
};

export default reducer;