import axios from 'axios';
import { apiUrl } from '../selectors/baseUrl';

const announceApi = (store) => (next) => (action) => {

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

  if (action.type === 'GET_ANNOUNCE_LIST') {
    //turn on spinner
    store.dispatch({
      type: 'LOADING_ON',
    });

    if (action.filter === 'categories') {
      axios.get(url + "announce/sortedby/" + action.categoryId, config)
        .then((response) => {
          store.dispatch({
            type: 'SAVE_ANNOUNCE_LIST',
            announceList: response.data,
          });

          //turn off spinner
          store.dispatch({
            type: 'LOADING_OFF',
          });

        })
        .catch((error) => {
          console.error('GET_ANNOUNCE_LIST error : ', error);
          //turn off spinner
          store.dispatch({
            type: 'LOADING_OFF',
          });
          store.dispatch({
            type: 'LOADING_ERROR',
          });
        });
    } else {

      //turn on spinner
      store.dispatch({
        type: 'LOADING_ON',
      });

      axios.get(url + "homeannounce")
        .then((response) => {

          //turn off spinner
          store.dispatch({
            type: 'LOADING_OFF',
          });

          store.dispatch({
            type: 'SAVE_ANNOUNCE_LIST',
            announceList: response.data,
          });
        })
        .catch((error) => {
          console.error('GET_ANNOUNCE_LIST error : ', error);
          //turn off spinner
          store.dispatch({
            type: 'LOADING_OFF',
          });
          store.dispatch({
            type: 'LOADING_ERROR',
          });
        });
    }
  }

  if (action.type === 'GET_HOMEWORK_BY_ID') {
    axios.get(url + "homeannounce/" + action.id)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CURRENT_HOMEWORK',
          currentHomework: response.data
        })
        store.dispatch({
          type: 'EDIT_HOMEWORK_ON',
        })
      })
      .catch((error) => console.log('GET_HOMEWORK_BY_ID - error'))
  }

  if (action.type === 'GET_ANNOUNCE_BY_ID') {

    store.dispatch({
      type: 'LOADING_ON',
    })

    axios.get(url + "homeannounce/" + action.id)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CURRENT_ANNOUNCE',
          currentAnnounce: response.data,
        });

        store.dispatch({
          type: 'GET_TEXT_EDITOR_VALUE_TO_MODIFY',
          editorValue: response.data.content,
        })

        //turn off spinner
        store.dispatch({
          type: 'LOADING_OFF',
        });
      })
      .catch((error) => {
        console.error('GET_ANNOUNCE_BY_ID error : ', error);

        //turn off spinner
        store.dispatch({
          type: 'LOADING_OFF',
        });
      });
  }

  if (action.type === 'GET_ANNOUNCE_LIST_BY_CLASS_ID') {
    axios.get(url + "announce/homework/" + action.id, config)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CLASSROOM_ANNOUNCE_LIST',
          announceList: response.data,
        });
      })
      .catch((error) => {
        console.error('GET_ANNOUNCE_LIST_BY_CLASS_ID error : ', error);
      });
  }


  if (action.type === 'GET_CATEGORY_LIST') {
    axios.get(url + "category/", config)
      .then((response) => {
        store.dispatch({
          type: 'SAVE_CATEGORY_LIST',
          categoryList: response.data,
        });
      })
      .catch((error) => {
        console.error('GET_CATEGORY_LIST error : ', error);
      });
  }

  //---POST Requests
  if (action.type === 'SUBMIT_ANNOUNCE') {
    axios({
      method: 'POST',
      url: url + "announce/",
      data: {
        "title": action.title,
        "content": action.content,
        "images": {
          "name": action.imgName,
          "value": action.imgB64,
        },
        "category": [action.categoryId]
      },
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((response) => {
      store.dispatch({
        type: 'MODIFY_FLASH_MESSAGE',
        value: "L'annonce a bien été envoyée",
      })
    }).catch((error) => {
      console.error('SUBMIT_ANNOUNCE error : ', error);
      store.dispatch({
        type: 'MODIFY_FLASH_MESSAGE',
        value: "Erreur réseau, le message n'a pas été transmis",
      })
    })
  }

  //---DELETE and MODIFY requests
  if (action.type === 'DELETE_ANNOUNCE_BY_ID') {
    axios.delete(url + "announce/" + state.announce.announceIdToDelete, config)
      .then((response) => {
        store.dispatch({
          type: 'GET_ANNOUNCE_LIST',
          flashMessage: response.data.ok,
        });
        store.dispatch({
          type: 'MODIFY_FLASH_MESSAGE',
          value: "Le contenu a bien été supprimée"
        });

        //if request was sent by homeworks pages, refresh content
        if (state.announce.contentCategory === "homeworkList") {
          store.dispatch({
            type: 'GET_ANNOUNCE_LIST_BY_CLASS_ID',
            id: state.announce.currentContentId,
          })
        }

      })
      .catch((error) => {
        console.error('DELETE_ANNOUNCE_BY_ID error : ', error);
      });
  }

  if (action.type === 'SUBMIT_MODIFIED_ANNOUNCE') {

    //check if image change and adapt data
    let sendData = ""
    if (state.announce.currentAnnounce.image[0] === 'd') {
      sendData = {
        "title": state.announce.currentAnnounce.title,
        "content": state.textEditor.editorContent,
        "images": {
          "name": "",
          "value": state.announce.currentAnnounce.image,
        },
        "category": [state.announce.currentAnnounce.category[0].id]
      }
    } else {
      sendData = {
        "title": state.announce.currentAnnounce.title,
        "content": state.textEditor.editorContent,
        "category": [state.announce.currentAnnounce.category[0].id]
      }
    }

    axios({
      method: 'PATCH',
      url: url + "announce/" + action.id,
      data: sendData,
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((response) => {
      store.dispatch({
        type: 'MODIFY_FLASH_MESSAGE',
        value: "Le contenu a bien été modifiée",
      });
      //refresh state with change
      store.dispatch({
        type: 'GET_ANNOUNCE_BY_ID',
        id: action.id,
      })
    }).catch((error) => {
      console.error('SUBMIT_MODIFIED_ANNOUNCE error : ', error);
    });
  }

  if (action.type === 'EDIT_HOMEWORK') {
    axios({
      method: 'PATCH',
      url: url + "announce/" + action.id,
      data: {
        homework: state.textEditor.editorContent,
      },
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((response) => {
      store.dispatch({
        type: 'MODIFY_FLASH_MESSAGE',
        value: "Le contenu a bien été modifiée",
      });
      store.dispatch({
        type: 'EDIT_HOMEWORK_OFF',
      });      
      //refresh state with change
      store.dispatch({
        type: 'GET_ANNOUNCE_BY_ID',
        id: action.id,
      })
    }).catch((error)=>{
     //console.dir(error)
      if(error.response.status===403){
        store.dispatch({
          type: 'MODIFY_FLASH_MESSAGE',
          value: "Vous n'êtes pas le créateur du contenu, vous ne pouvez  pas le modifier",
        });
      };
    })
  }

  next(action);
};

export default announceApi;

