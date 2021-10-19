import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/index.js';

import { loadState, saveState, removeState } from './localStorage.js';

// we import the middlewares
import announceApi from '../middlewares/announceApi';
import connectionApi from '../middlewares/connectionApi';
import scheduleApi from '../middlewares/scheduleApi';
import disciplineApi from '../middlewares/disciplineApi';
import lessonApi from '../middlewares/lessonApi';
import marksApi from '../middlewares/marksApi';
import classroomApi from '../middlewares/classroomApi';

// we call each middleware
const middlewares = applyMiddleware(
    announceApi,
    connectionApi,
    scheduleApi,
    disciplineApi,
    lessonApi,
    marksApi,
    classroomApi,
);

// on met bout à bout le redux devtools et nos middlewares
// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middlewares);

// we need to persisting the state to the local storage
const persistedState = loadState();
// we create the store and we put on the store
// the reducer, the persisted State
// and the middlewares (with the devtool) 
const store = createStore(
    reducer, 
    persistedState,
    enhancers
);
// when any action is dispached 
// we save the user state
// and if the user log off we remove the user state
store.subscribe(() => {
    saveState({
        user: store.getState().user
    });
    if (store.getState().user.logged === false) {
        removeState ({user :store.getState().user})
    }

});

export default store;