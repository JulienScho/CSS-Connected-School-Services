// == Import
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { User, UserCheck, Unlock  } from 'react-feather';

// == Composants
const AccountMenu = ( { handleLogout, handleBtnAccountClick } ) => {
    const firstname = useSelector((state) => state.user.firstname);

    return (
    <li className="connection__item">
        <button onClick={ handleBtnAccountClick} className="connection__button">
        <span className="connection__icon connected"><UserCheck />
        </span>
        <span className="connection__text">{firstname}</span>
        </button>
        <div className="dropdown">
            <Link to="/espace-perso">
                <span className="dropdown__icon">
                    <User />
                </span>
                <span className="dropdown__text">
                    Accueil espace perso
                </span>
            </Link>
            <Link to="/">
            <button className="deconnection" onClick={handleLogout}>
                <span className="dropdown__icon">
                    <Unlock />
                </span>
                <span className="dropdown__text">
                    Déconnexion
                </span>
            </button>
            </Link>
        </div>
    </li>
    )
}

AccountMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    handleBtnAccountClick : PropTypes.func.isRequired,
  };
  

export default AccountMenu;
