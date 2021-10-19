export const initialState = {
  logged: false,
  firstname: '',
  lastname: '',
  image: '',
  email: '',
  adress: '10 rue de truc',
  zip_code: '75000',
  city: 'Paris',
  phone: '06000000',
  password: '',
  token: '',
  roles: [],
  classroomId: '',
  classroom: '',
  userId: '',
  classroomGrade: '',
  discipline: '',
  disciplineId: '',
  loginOpen: false,
  burgerOpen: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'LOGIN':
      return {
        ...state,
      };
    case 'LOGOUT':
      return {
        ...state,
        logged: false,
        token: '',
        roles: [],
      };
    case 'SAVE_USER':
      return {
        ...state,
        logged: true,
        firstname: action.firstname,
        lastname: action.lastname,
        loginOpen: false,
        token: action.token,
        roles: action.roles,
        email: '',
        password: '',
        classroomId: action.classroomId,
        classroom: action.classroomName,
        userId: action.userId,
        classroomGrade: action.classroomGrade,
        discipline: action.discipline,
        disciplineId: action.disciplineId,
      };
    case 'TOGGLE_OPEN':
      return {
        ...state,
        loginOpen: !state.loginOpen,
        burgerOpen: false,
      };

    case 'CLOSE_LOGIN_WINDOW':
      return {
        ...state,
        loginOpen: false,
      };

    case 'BURGER_TOGGLE_OPEN':
      return {
        ...state,
        burgerOpen: !state.burgerOpen,
        loginOpen: false,
      };

    case 'MOBILE_MENU_CLOSE':
      return {
        ...state,
        burgerOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;

