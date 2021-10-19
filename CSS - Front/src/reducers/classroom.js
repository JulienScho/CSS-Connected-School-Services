const initialState = {
  userList: [],
  grade: 'Sixième',
  letter: 'A',
  teacherClassroomList: [[]],
  currentStudentList: [],

  addHomeworksSelectedClassroomId: [],
  addHomeworksSelectedCategoryValue: 'Devoirs', //class announces or homeworks
  addHomeworksSelectedDate: '',
  addHomeworksContentValue: '',

};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case 'SAVE_TEACHER_CLASSROOMS_LIST': {
      return {
        ...state,
        teacherClassroomList: [action.classroomList],
      }
    }
    case 'SAVE_STUDENTS_LIST':
      return {
        ...state,
        currentStudentList: action.studentList
      }
    case 'CHANGE_ADD_HOMEWORKS_SELECT_CLASSROOM':
      return {
        ...state,
        addHomeworksSelectedClassroom: [action.id],
      }
    case 'CHANGE_ADD_HOMEWORKS_SELECT_CATEGORY':
      return {
        ...state,
        addHomeworksSelectedCategoryValue: action.value,
      }
    case 'CHANGE_ADD_HOMEWORKS_SELECT_DATE':
      return {
        ...state,
        addHomeworksSelectedDate: action.value,
      }
    case 'RESET_STUDENTS_LIST_STATE':
      return {
        ...state,
        currentStudentList: [],
      }

    default:
      return state;
  }
};

export default reducer;