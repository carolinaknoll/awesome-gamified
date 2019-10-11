import {combineReducers} from 'redux';
import subjects from './subjectsReducer';

const rootReducer = combineReducers({
  subjects,
});

export default rootReducer;
