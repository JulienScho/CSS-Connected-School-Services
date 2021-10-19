import axios from 'axios';
import { apiUrl } from '../selectors/baseUrl';

const marksApi = (store) => (next) => (action) => {

  const state = store.getState(); // access to store then state
  const token = state.user.token;

  const url = apiUrl;

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    }
  }

  if (action.type === 'GET_CURRENT_MARKS') {
    axios.get(url + "note/sortedbystudents/" + action.id, config)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CURRENT_MARKS',
          currentMarks: response.data,
          currentDisciplines: response.data,
          currentAverages: response.data,
        });
      })

    if (action.type === 'SAVE_RESOURCE') {
      axios.get(url + "lesson", config)
        .then((response) => {
          store.dispatch({
            type: 'SAVE_RESOURCE',
            resource: response.data,
          });
        })

        .catch((error) => {
          console.error('GET_CURRENT_MARKS error : ', error);
        });
    }
  }
  if (action.type === 'GET_MARKS_LIST') {
    axios.get(url + "note/", config)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_MARKS_LIST',
          marksList: response.data,
        });
      }).catch((error) => {
        console.error('GET_MARKS error : ', error);
      });
  }

  if (action.type === 'SEND_MARKS') {
    //one request for one student/mark
    action.marksArray.map((mark) => {
      axios({
        method: 'POST',
        url: url + "note/",
        data: {
          "user": mark.id,
          "discipline": action.disciplineId,
          "title": action.marksTitle,
          "grade": mark.mark,
        },
        headers: {
          Authorization: "Bearer " + token,
        }
      }).then((response) => {

        store.dispatch({
          type: 'RESET_STUDENTS_LIST_STATE',
        })
        store.dispatch({
          type: 'MODIFY_FLASH_MESSAGE',
          value: "Les notes ont bien été envoyées",
        })
      }).catch((error) => {
        console.error('SEND_MARKS error : ', error);
        store.dispatch({
          type: 'MODIFY_FLASH_MESSAGE',
          value: "Erreur réseau, les notes n'ont pas été transmises",
        })
      })
      return true;
    })
  }

  if (action.type === 'GET_STUDENTS_MARKS_BY_CLASS_ID') {
    axios.get(url + "note/sortedbyclassroom/" + action.id, config)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CLASSROOM_MARKS',
          marksList: response.data,
        });
      })

      .catch((error) => {
        console.error('GET_STUDENTS_MARKS_BY_CLASS_ID error : ', error);
      });
  }

  if (action.type === 'EDIT_STUDENT_MARK') {
    axios({
      method: 'PATCH',
      url: url + "note/" + action.markId,
      data: {
        grade: action.mark,
      },
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((response) => {
      // store.dispatch({
      //   type: 'MODIFY_FLASH_MESSAGE',
      //   value: "La note a bien été modifiée",
      // });
      //refresh state with change
      store.dispatch({
        type: 'GET_STUDENTS_MARKS_BY_CLASS_ID',
        id: action.classroomId,
      })
    }).catch((error) => {
      console.error('EDIT_STUDENT_MARK error : ', error);
    });
  }

  next(action);
};

export default marksApi;