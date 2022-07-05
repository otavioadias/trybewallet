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

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function actionDeleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
}

export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export function actionUpdateExpense(id) {
  return {
    type: UPDATE_EXPENSE,
    payload: id,
  };
}

// export const UPDATE_EXPENSE_COMMIT = 'UPDATE_EXPENSE_COMMIT';

// export function actionUpdateExpenseCommit(expense) {
//   return {
//     type: UPDATE_EXPENSE_COMMIT,
//     payload: expense,
//   };
// }
