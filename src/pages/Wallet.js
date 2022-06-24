import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import economy from '../services/api';
import { actionCurrencies } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { currencies, dispatch } = this.props;
    const response = await economy();
    const arrayCurrencies = Object.keys(response);
    arrayCurrencies.map((item) => currencies.push(item));
    dispatch(actionCurrencies(currencies));
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p>TrybeWallet</p>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
