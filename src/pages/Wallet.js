import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import economy from '../services/api';
import { actionCurrencies, actionExpenses } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: '',
    ask: 0,
  };

  async componentDidMount() {
    const { addCurrencies } = this.props;
    const response = await economy();
    this.setState({ exchangeRates: response });
    const arrayCurrencies = Object.keys(response);
    addCurrencies(arrayCurrencies);
  }

  onButtonClick = (event) => {
    event.preventDefault();
    const { addGlobalState } = this.props;
    addGlobalState(this.state);
    const { value } = this.state;
    this.setState((prevState) => ({ ask: prevState.ask + parseInt(value, 10) }));
    this.setState({ value: '', description: '' });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { email, currencies } = this.props;
    const { ask, value, description } = this.state;
    return (
      <>
        <header>
          <p>TrybeWallet</p>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ ask }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <br />
        <form onSubmit={ this.onButtonClick }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.onInputChange }
            >
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
            <select
              data-testid="method-input"
              id="payment"
              name="payment"
              onChange={ this.onInputChange }
            >
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              onChange={ this.onInputChange }
            >
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
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
        <br />
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addGlobalState: (expenses) => dispatch(actionExpenses(expenses)),
  addCurrencies: (currencies) => dispatch(actionCurrencies(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  addGlobalState: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
