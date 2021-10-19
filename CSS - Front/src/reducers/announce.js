const initialState = {
    announceList: [{
        id: '',
        title: '',
        content: '',
        image: '',
        category: [],
        createdAt: '',
        homework: ''
    }],

    currentAnnounce: {
        id: '',
        title: '',
        content: '',
        image: '',
        category: [],
        createdAt: '',
        homework: ''
    },
    newAnnounceTitle: '',
    newAnnounceContent: '',
    newAnnounceCategoryId: 0,
    newAnnounceHomework: 'ok',
    newAnnounceImageName: '',
    newAnnonceImageBase64: '',
    newCategoryInputValue: '',

    categoryList: [],

    // Homeworks initial state
    classroomAnnounces: [],

    flashMessageContent: "",

    isError: false,

    isModalOpen: false,

    //state for popup modal information
    announceIdToDelete: "",
    contentcategory: "",
    currentContentId: "",

    currentHomework: "",
    editHomework: false,

    isLoading: false,

};

const reducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case 'SAVE_ANNOUNCE_LIST':
            return {
                ...state,
                announceList: action.announceList,
            }
        case 'SAVE_CURRENT_ANNOUNCE':
            return {
                ...state,
                currentAnnounce: action.currentAnnounce,
            }
        case 'SAVE_CLASSROOM_ANNOUNCE_LIST': {
            return {
                ...state,
                classroomAnnounces: action.announceList
            }
        }
        case 'CHANGE_INPUT_TITLE':
            return {
                ...state,
                newAnnounceTitle: action.value,
            }
        case 'CHANGE_ADD_ANNOUNCE_CONTENT':
            return {
                ...state,
                newAnnounceContent: action.value
            }
        case 'CHANGE_SELECT_ANNOUNCE':
            return {
                ...state,
                newAnnounceCategoryId: action.value,
            }
        case 'CHANGE_INPUT_IMAGE': {
            return {
                ...state,
                newAnnounceImageName: action.imgName,
                newAnnonceImageBase64: action.fileValue,
            }
        }
        case 'CHANGE_INPUT_HOMEWORK':
            return {
                ...state,
            }
        case 'EDIT_HOMEWORK_ON':
            return {
                ...state,
                editHomework: true,
            }  
        case 'EDIT_HOMEWORK_OFF':
            return {
                ...state,
                editHomework: false,
            } 
        case 'CHANGE_INPUT_CATEGORY':
            return {
                ...state,
                newCategoryInputValue: action.value
            }
        case 'SAVE_CATEGORY_LIST':
            return {
                ...state,
                categoryList: action.categoryList
            }

        //MODIFY ANNOUNCE ELEMENTS
        case 'MODIFY_CURRENT_ANNOUNCE_TITLE':
            return {
                ...state,
                currentAnnounce: { ...state.currentAnnounce, title: action.value }
            }

        case 'MODIFY_CURRENT_ANNOUNCE_SELECT': {
            return {
                ...state,
                currentAnnounce: { ...state.currentAnnounce, category: [action.value], }
            }
        }

        case 'MODIFY_CURRENT_IMAGE': {
            return {
                ...state,
                currentAnnounce: { ...state.currentAnnounce, image: action.fileValue, }
            }
        }

        case 'RESET_FLASH_MESSAGES': {
            return {
                ...state,
                flashMessageContent: "",
            }
        }

        case 'MODIFY_FLASH_MESSAGE': {
            return {
                ...state,
                flashMessageContent: action.value,
            }
        }
        case 'LOADING_ERROR':
            return {
                ...state,
                isError: true
            }
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
            }
        case 'MODIFY_ANNOUNCE_ID_TO_DELETE':
            return {
                ...state,
                announceIdToDelete: action.id,
                contentCategory: action.contentCategory,
                currentContentId: action.currentContentId,
            }       
        case 'LOADING_ON':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOADING_OFF':
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    };
};

export default reducer;
