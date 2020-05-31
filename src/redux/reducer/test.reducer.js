import {SET_TEST} from '../type';

const initialState = {
  value: '',
};

export default (state = initialState, action) => {
  const {payload, type} = action;

  switch (type) {
    case SET_TEST:
      return {
        ...state,
        value: payload,
      };

    default:
      return state;
  }
};
