// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const CURRENCIES = 'CURRENCIES';

export const action = (email) => ({
  type: EMAIL,
  payload: {
    email,
  },
});

export const actionCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

export const EXPENSES = 'EXPENSES';

const acExpenses = (expenses, api) => ({
  type: EXPENSES,
  payload: {
    ...expenses,
    exchangeRates: api,
  },
});

export const actionExpenses = (expenses, api) => async (dispatch) => {
  dispatch(acExpenses(expenses, api));
};
