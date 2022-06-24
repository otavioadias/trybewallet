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
  payload: {
    currencies,
  },
});

export default action;
