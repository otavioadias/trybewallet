import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import economy from '../services/api';
import { actionCurrencies } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const response = await economy();
    const arrayCurrencies = Object.keys(response);
    dispatch(actionCurrencies(arrayCurrencies));
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <header>
        <p>TrybeWallet</p>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <br />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select id="currencies" data-testid="currency-input">
              {
                currencies?.map((currency) => (
                  <option id="currencies" key={ currency } value={ currency }>
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="payment">
            Método de Pagamento:
            <select data-testid="method-input">
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select data-testid="tag-input">
              <option value="food">Alimentação</option>
              <option value="lounge">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description"
            />
          </label>
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

// const mapDispatchToProps = (dispatch) => ({
//   currencies: () => dispatch(actionCurrencies()),
// });

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Wallet);
