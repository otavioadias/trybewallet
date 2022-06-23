// Coloque aqui suas actions
export const EMAIL = 'EMAIL';

const action = (email) => ({
  type: EMAIL,
  payload: {
    email,
  },
});

export default action;
