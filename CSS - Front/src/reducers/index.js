import { combineReducers } from 'redux';

import userReducer from './user';
import classroomReducer from './classroom';
import announceReducer from './announce';
import lessonReducer from './lesson';
import marksReducer from './marks';
import scheduleReducer from './schedule'
import textEditorReducer from './textEditor'

const rootReducer = combineReducers({
  user: userReducer,
  classroom: classroomReducer,
  announce: announceReducer,
  lesson: lessonReducer,
  schedule: scheduleReducer,
  marks: marksReducer,
  textEditor: textEditorReducer
});

export default rootReducer;