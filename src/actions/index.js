// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const CURRENCIES = 'CURRENCIES';

const action = (email) => ({
  type: EMAIL,
  payload: {
    email,
  },
});

export const actionCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

// export function economy() {
//   return async (dispatch) => {
//     const { currencies } = this.props;
//     const url = 'https://economia.awesomeapi.com.br/json/all';
//     const response = await fetch(url);
//     const result = await response.json();
//     delete result.USDT;
//     const arrayCurrencies = await Object.keys(result);
//     dispatch(actionCurrencies(arrayCurrencies));
//     return result;
//   };
// }

export default action;
