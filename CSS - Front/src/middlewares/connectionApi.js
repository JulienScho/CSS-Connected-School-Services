import axios from 'axios';

const connectionApi = (store) => (next) => (action) => {
    //You can create a new instance of axios with a custom config
    const api = axios.create({
        baseURL: 'http://ec2-3-80-208-180.compute-1.amazonaws.com/api',
    });

    if (action.type === 'LOGIN') {
        const state = store.getState();
        api.post('/login_check', {
            username: state.user.email,
            password: state.user.password,
        })
            .then((response) => {
                let classroomId = "";
                let classroomName = "";
                let classroomGrade = "";
                let discipline = "";
                let disciplineId = "";

                if (response.data.data.roles[0] !== "ROLE_TEACHER") {
                    //conditionnal variable when ROLE_ADMIN classroom is null
                    classroomId = response.data.data.classroom ? response.data.data.classroom.id : [];
                    classroomName = response.data.data.classroom ? response.data.data.classroom.grade + "ème " + response.data.data.classroom.letter.toUpperCase() : "";
                    classroomGrade = response.data.data.classroom ? response.data.data.classroom.grade + "ème" : "0";
                } else { 
                    discipline = response.data.data.discipline;
                    disciplineId = response.data.data.discipline_id;
                }

                //api.defaults.headers.common.Authorization = `bearer ${response.data.token}`;
                store.dispatch({
                    type: 'SAVE_USER',
                    firstname: response.data.data.firstname,
                    lastname: response.data.data.lastname,
                    token: response.data.token,
                    roles: response.data.data.roles,
                    classroomId: classroomId,
                    classroomName: classroomName,
                    userId: response.data.data.id,
                    classroomGrade: classroomGrade,
                    discipline: discipline,
                    disciplineId: disciplineId,

                });
            })
            .catch((error) => {
                console.error(error);
                alert('Authentification échouée');
            });
    }
    next(action);
};


export default connectionApi;