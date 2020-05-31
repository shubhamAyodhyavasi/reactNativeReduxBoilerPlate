import {SET_TEST} from '../type';

export const setTest = (payload) => (dispatch) => {
  dispatch({
    type: SET_TEST,
    payload: `test: ${payload}`,
  });
};
