import axios from 'axios';
import { apiUrl } from '../selectors/baseUrl';

const lessonApi = (store) => (next) => (action) => {

    const state = store.getState(); // access to store then state
    const token = state.user.token;
  
    //config provisoire
    // const url = 'http://adrien-dubois.vpnuser.lan/CSS/css-back/public/api/v1/';
    // const url = 'http://kevin-planchais.vpnuser.lan/Apoth%C3%A9ose/projet-connected-school-services/public/api/v1/';
    const url = apiUrl;
    
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    }

   //---GET Requests

  if (action.type === 'FETCH_RESOURCES') { 
    axios.get(url + "lesson/orderByTitle", config)
    .then((response) => {
      store.dispatch({
        type: 'SAVE_RESOURCE',
        resource: response.data,
      });

    })
    .catch((error) => {
      console.error('FETCH_RESOURCES error : ', error);
    });
    
  }

  //---POST Requests
  if (action.type === 'SEND_NEW_RESOURCE') {
    const state = store.getState();
    axios.post(url + 'lesson/', {
      title: state.lesson.newResourceTitle,
      content: action.content,
      discipline: action.disciplineId,
    }, config)
    .then(function (response) {

      store.dispatch({
        type: 'ADD_RESOURCE',
        newResource: response.data
      });

      store.dispatch({
        type: 'EDIT_RESOURCES_FLASH_MESSAGE',
        value: "La nouvelle ressource a été ajoutée",
      });
      
    })
    .catch(function (error) {
      console.error(error);
      store.dispatch({
        type: 'EDIT_RESOURCES_FLASH_MESSAGE',
        value: "Erreur, la ressource n'a pas été ajoutée. Veuillez réesayer"
      })
    });
  }

  if (action.type === 'SUBMIT_EDITED_RESOURCE') {
    const state = store.getState();
    axios.patch(url + 'lesson/' + action.id, {
      id: action.id,
      title: state.lesson.currentResource.title,
      content: action.content
    }, config)
    .then(function (response) {
      //refresh state with change
      store.dispatch({
        type: 'ACCORDION_CLOSE',
      });

      store.dispatch({
        type: 'EDIT_RESOURCES_FLASH_MESSAGE',
        value: "La ressource a été modifiée.",
      });

      store.dispatch({
        type: 'FETCH_RESOURCES',
        id: action.id,
      });

    })
    .catch(function (error) {
      console.error(error);
      store.dispatch({
        type: 'EDIT_RESOURCES_FLASH_MESSAGE',
        value: "Erreur, la ressource n'a pas été modifiée. Veuillez réesayer."
      })
    });
  }
   //---DELETErequest
   if (action.type === 'DELETE_RESOURCE') {
    axios.delete(url + "lesson/" + action.id, config)
      .then((response) => {
        store.dispatch({
          type: 'FETCH_RESOURCES',
        });
 
      })
      .catch((error) => {
        console.error('DELETE_ANNOUNCE_BY_ID error : ', error);
      });
  }
  next(action); 
};

export default lessonApi;