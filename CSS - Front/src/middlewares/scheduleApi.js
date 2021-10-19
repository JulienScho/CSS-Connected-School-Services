import axios from 'axios';
import { apiUrl } from '../selectors/baseUrl';

const scheduleApi = (store) => (next) => (action) => {

    const state = store.getState(); // access to store then state
    const token = state.user.token;
  
    const url = apiUrl
    
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
  
  if (action.type === 'GET_CURRENT_SCHEDULE') { 
    axios.get(url + "planning", config)
    .then((response) => {
      store.dispatch({
        type: 'SAVE_CURRENT_SCHEDULE',
        currentSchedule: response.data,
      });
    })
    .catch((error) => {
      console.error('GET_CURRENT_SCHEDULE error : ', error);
    });
    
  }
  next(action); // dans tous les cas je laisse passer l'action
};

export default scheduleApi;