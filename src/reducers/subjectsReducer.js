import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function subjects(state = initialState.subjects, action) {
  switch (action.type) {
    case types.FETCH_SUBJECTS:
      return [action.payload.data, ...state];
  }

  return state;
}
