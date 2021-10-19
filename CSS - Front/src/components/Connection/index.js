// == Import
import { useSelector, useDispatch } from 'react-redux';

import { User, X } from 'react-feather';

import './style.scss';
import LoginForm from './LoginForm';
import AccountMenu from './AccountMenu';
// == Composant
const Connection = () => {
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isOpen = useSelector((state) => state.user.loginOpen);
  const logged = useSelector((state) => state.user.logged);
  
  const dispatch = useDispatch();

  const changeField = (value, key) => {
    dispatch({
      type: 'CHANGE_VALUE',
      value: value,
      key: key,
    });
  };

  const login = () => {
    dispatch({
      type: 'LOGIN',
    });
  };

  const handleClick = () => {
    dispatch({
      type: 'TOGGLE_OPEN',
    });
  };
  const logout = () => {
      dispatch({
        type: 'LOGOUT',
      });
    };

  const closeBurgerIcon = () => {
    dispatch({
      type: 'MOBILE_MENU_CLOSE'
    });
  };

  return (
    <div className="connection">
      <ul className="connection__list">
        {logged ? 
          <AccountMenu handleLogout={logout} handleBtnAccountClick={closeBurgerIcon} />
          :
          <li className="connection__item"> 
            <button onClick={handleClick} className="connection__button">
              <span className="connection__icon"><User /></span>
              <span className="connection__text">Connexion</span>
            </button>
          </li> 
        }
      </ul>
      <div className={isOpen ? "login" : "login login--hidden"} >

        <div className="login__close" onClick={handleClick}><X /></div>
  
          <LoginForm         
            email={email}
            password={password}
            changeField={changeField}
            handleLogin={login}
            isLogged={logged}
            handleLogout={logout}
          />

          <a target="_blank" rel="noreferrer" className="login__forget" href="http://ec2-3-80-208-180.compute-1.amazonaws.com/reset_pass">Mot de passe oublié?</a>

      </div>
    </div>
  );
}

export default Connection;
