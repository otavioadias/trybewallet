import { EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const user = (state = { email: '' }, action) => {
  if (action.type === EMAIL) {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  return state;
};

export default user;
