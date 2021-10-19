const initialState = {
    disciplinesList: [],

    currentDiscipline: "Français",
    
    resourcesList: [{
        id: '',
        title: '',
        content: '',
        createdAt: '',
        discipline: [],
    }],

    currentResource: {
        id: '',
        title: '',
        content: '',
        createdAt: '',
        discipline: [],
    },

    selected: null,

    textEditorOpen: false,

    editResourceOpen: false,
    newResourceTitle: '',
    newResourceContent: '',
    newDisciplineId: '',

    flashMessageContent: "",

    modalOpen: false,

    loading: true,

};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case 'FETCH_RESOURCE':
            return {
                ...state,
            };
        
        case 'SAVE_DISCIPLINE':
            return {
                ...state,
                disciplinesList: action.discipline,
                loading: false,
            };
        case 'SAVE_RESOURCE':
            return {
                ...state,
                resourcesList: action.resource,
                modalOpen: false,
                loading: false,
            };

        case 'SAVE_CURRENT_RESOURCE':
            return {
                ...state,
                currentResource: action.currentResource,
            };

        case 'CHANGE_SELECT_DISCIPLINE':
            return {
                ...state,
                currentDiscipline: action.value,
            };
        case 'ACCORDION_OPEN':
            return {
                ...state,
                selected: action.index,
                currentResource: action.currentResource,

            };
        case 'ACCORDION_CLOSE':
            return {
                ...state,
                selected: null,
                currentResource: ''

            };
        case 'OPEN_RESOURCES_TEXT_EDITOR':
            return {
                ...state,
                textEditorOpen: !state.textEditorOpen,
            }; 

        case 'CHANGE_INPUT_RESOURCE_TITLE':
            return {
                ...state,
                newResourceTitle: action.newTitle,
            };

        case 'CHANGE_INPUT_RESOURCE_CONTENT':
            return {
                ...state,
                newResourceContent: action.newContent,
            };
        
        case 'EDIT_RESOURCES_FLASH_MESSAGE': 
            return {
                ...state,
                flashMessageContent: action.value,
            
            };

        case 'RESET_FLASH_MESSAGES': {
            return {
                ...state,
                flashMessageContent: "",
            }
        }
            
        case 'ADD_RESOURCE': 
            return {
                ...state,
                newResourceTitle: "",
                textEditorOpen: false,
                resourcesList: [
                    ...state.resourcesList,
                    action.newResource,
                ]
            };

        case 'OPEN_EDIT_RESOURCE': 
            return {
                ...state,
                editResourceOpen: !state.editResourceOpen,
            };

        case 'MODIFY_CURRENT_RESOURCE_TITLE': 
            return {
                ...state,
                currentResource: {
                    title: action.newTitle,
                }  
            };

        case 'OPEN_DELETE_MODAL': 
        return {
            ...state,
            modalOpen: true, 
        };
        
        
        default:
            return state;
    }
};

export default reducer;