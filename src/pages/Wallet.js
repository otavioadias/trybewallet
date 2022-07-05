import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import economy from '../services/api';
import { actionCurrencies, actionExpenses } from '../actions';
import Table from './Table';

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

  // shouldComponentUpdate(nextProps) {
  //   const { editor, idToEdit } = nextProps;
  //   console.log(idToEdit);
  //   const { id } = this.state;
  //   if (editor && id === idToEdit) {
  //     this.setState(expenseToUpdate);
  //     return true;
  //   }
  //   return true;
  // }

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
    const { email, currencies } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <header className="headerWallet">
          <div className="headerTitle">
            <img src="https://cdn.discordapp.com/attachments/938669134890278937/994003451044434030/20220705_191302_0001.png" alt="Logo Wallet" width="200px" />
          </div>
          <div className="headerInfo">
            <p data-testid="email-field">{ email }</p>
            <p data-testid="total-field">{`Total: R$ ${this.sum()}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <br />
        <form className="formWallet" onSubmit={ this.onButtonClick }>
          <label htmlFor="value">
            Valor:
            <input
              className="inputWallet"
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
              className="inputWallet"
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
              className="inputWallet"
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
              className="inputWallet"
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
              className="inputWallet"
              type="text"
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="btnWallet"
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <br />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // expenseToUpdate: state.wallet.expenses
  //   .find(({ id }) => id === state.expenses.idToEdit),
  // idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  addGlobalState: (expenses, api) => dispatch(actionExpenses(expenses, api)),
  addCurrencies: (currencies) => dispatch(actionCurrencies(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  addGlobalState: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  // editor: PropTypes.bool.isRequired,
  // idToEdit: PropTypes.number.isRequired,
};

// Wallet.defaultProps = {
//   expenseToUpdate: {},
// };

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
