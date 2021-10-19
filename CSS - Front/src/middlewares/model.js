import axios from 'axios';

const APIMiddleware = (store) => (next) => (action) => {
  // attention dans un middleware on ne peut pas utiliser de hooks useEffect, useSelector, useQQCH
  // parce les hooks ne sont utilisables que dans les composants
  if (action.type === 'LOGIN') { // quand login passe
    const state = store.getState(); // j'ai accès au store dans les middlewares donc au state
    axios.post('http://localhost:3001/login', { // je fais l'appel api
      email: state.userEmail,
      password: state.userPassword,
    })
      .then((response) => {
        // une fois la réponse obtenu on veut mettre les données reçues dans le state ?
        // -> on dispatch une action pour véhiculer ces données et les traduire dans le reducer
        store.dispatch({
          type: 'SAVE_USER',
          pseudo: response.data.pseudo,
        });
      })
      .catch((error) => {
        console.error(error);
        store.dispatch({
          type: 'LOGIN_ERROR',
          message: 'Mauvais identifiant / mot de passe',
        });
      });
  }
  next(action); // dans tous les cas je laisse passer l'action
};

export default APIMiddleware;