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

export const actionExpenses = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});
