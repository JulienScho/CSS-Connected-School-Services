// == Import
import PropTypes from 'prop-types';

import Input from './Input';

// == Composant
const LoginForm = ({
  email,
  password,
  changeField,
  handleLogin,
}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
      };

    return (
      <form onSubmit={handleSubmit} className="connection__form">
      <h2 className="connection__title">Connexion</h2>
        <Input
          name="email"
          type="email"
          placeholder="Adresse Email"
          aria-label="Email"
          onChange={changeField}
          value={email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          onChange={changeField}
          value={password}
        />
          <button className="connection__btn" type="submit">Se connecter</button>
      </form>
    );
  };

  LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isLogged: PropTypes.bool,
  };
  
  LoginForm.defaultProps = {
    isLogged: false,
  };
  
  export default LoginForm;