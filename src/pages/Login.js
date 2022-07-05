import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { action } from '../actions';

class Login extends React.Component {
  state = {
    password: '',
    disabled: true,
  }

  onButtonChange = () => {
    const { password, email } = this.state;
    const NUM_MIN = 6;

    if (password.length >= NUM_MIN && email.match(/\S+@\S+\.\S+/)) {
      return this.setState({ disabled: false });
    } this.setState({ disabled: true });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, this.onButtonChange);
  }

  onButtonClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(action(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="bodyForm">
        <div className="contentForm">
          <img className="logoWallet" src="https://cdn.discordapp.com/attachments/938669134890278937/991892247861809213/20220629_232431_0000.png" alt="Wallet" width="275px" />
          <form className="loginForm">
            <p id="login">Login</p>
            <input
              className="input"
              type="email"
              data-testid="email-input"
              placeholder="E-mail"
              value={ email }
              id="email"
              onChange={ this.onInputChange }
              required
            />
            <input
              className="input"
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              value={ password }
              id="password"
              onChange={ this.onInputChange }
            />
            <button
              className="btnLogin"
              type="submit"
              disabled={ disabled }
              onClick={ this.onButtonClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
