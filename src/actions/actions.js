import * as types from './actionTypes';

import axios from 'axios';

const SUBJECTS_URL = 'https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json';

export function fetchSubjects() {
  const request = axios.get(SUBJECTS_URL);

  return {
    type: types.FETCH_SUBJECTS,
    payload: request
  };
}
