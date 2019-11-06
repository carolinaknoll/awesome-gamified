import * as types from './actionTypes';
import * as constants from '../constants';
import axios from 'axios';

export function fetchSubjects() {
  return (dispatch) => {
    axios.get(constants.SUBJECTS_URL)
    .then((subjects) => {
      dispatch(handleFetchSubjects(subjects));
    })
    .catch((e) => {
      dispatch(handleFetchSubjects([]));
    });
  }
}

function handleFetchSubjects(data) {
  return {
    type: types.FETCH_SUBJECTS,
    payload: data
  };
}
