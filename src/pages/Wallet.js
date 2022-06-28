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
  };

  async componentDidMount() {
    const { addCurrencies } = this.props;
    const response = await economy();
    this.setState({ exchangeRates: response });
    const arrayCurrencies = Object.keys(response);
    addCurrencies(arrayCurrencies);
  }

  onButtonClick = async (event) => {
    event.preventDefault();
    const response = await economy();
    const { addGlobalState } = this.props;
    addGlobalState(this.state, response);
    this.setState({ value: '', description: '' });
    this.setState((prevState) => ({ id: prevState.id + 1 }));
  }

  sum = () => {
    const { expenses } = this.props;
    const result = expenses.map((exp) => (
      Math.trunc((exp.exchangeRates[exp.currency].ask) * Number(exp.value) * 100) / 100
    ));
    const total = result.reduce((a, b) => Number(a) + Number(b), 0);
    return total;
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <header>
          <p>TrybeWallet</p>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ this.sum() }</p>
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
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
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
          <tbody>
            {expenses.map(({ id, currency, method, tag, descript, val }) => (
              <tr key={ id }>
                <td>{descript}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{val}</td>
                <td>{currency}</td>
                <td>
                  <button type="button">Remover</button>
                  <button type="button">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
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
  addGlobalState: (expenses, api) => dispatch(actionExpenses(expenses, api)),
  addCurrencies: (currencies) => dispatch(actionCurrencies(currencies)),
});

Wallet.propTypes = {
  // value: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  addGlobalState: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
