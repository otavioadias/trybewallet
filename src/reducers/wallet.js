import { CURRENCIES } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const wallet = (state = { currencies: [] }, action) => {
  if (action.type === CURRENCIES) {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  return state;
};

export default wallet;
