import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { boUrl } from '../../selectors/baseUrl';
import { Calendar, Users, Book, Server, Award, User, ExternalLink } from 'react-feather';


import './style.scss';


const MobileBar = ()  => {
    const roleStudent = useSelector((state) => state.user.roles.includes('ROLE_USER'));
    const roleAdmin = useSelector((state) => state.user.roles.includes('ROLE_ADMIN'));
    const roleTeacher = useSelector((state) => state.user.roles.includes('ROLE_TEACHER'));
    return (
        <div className="mobileBar">
            <nav className='mobileBar__menu'>
                {roleStudent && // if I am a student
                <ul className='mobileBar__list'>
                    <NavLink className='mobileBar__link' to="/espace-perso" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Calendar /></span>
                            <span className='mobileBar__text'>Espace <br/>perso</span>
                        </li> 
                    </NavLink> 
                    <NavLink className='mobileBar__link' to="/espace-perso/mon-emploi-du-temps" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Calendar /></span>
                            <span className='mobileBar__text'>Emploi <br/> du temps</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-cours" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Book /></span>
                            <span className='mobileBar__text'>Cours</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-devoirs" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Server /></span>
                            <span className='mobileBar__text'>Agenda</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-notes" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Award /></span>
                            <span className='mobileBar__text'>Notes</span>
                        </li>                  
                    </NavLink>   
                </ul>
                }
                {roleAdmin &&
                <ul className='mobileBar__list'>
                    <NavLink className='mobileBar__link' to="/espace-perso" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><User /></span>
                            <span className='mobileBar__text'>Espace perso</span>
                        </li> 
                    </NavLink>    
                    <NavLink className='mobileBar__link' to="/annonces/ajout" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Server /></span>
                            <span className='mobileBar__text'>Gestion des Annonces</span>
                        </li>   
                    </NavLink>   
                    <a className='mobileBar__link' href={boUrl} target="_blank" rel="noreferrer">
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><ExternalLink /></span>
                            <span className='mobileBar__text'>Accès Back-Office </span>
                        </li>                  
                    </a>     
                </ul>
                }
                {roleTeacher && // If i am teacher
                <ul className='mobileBar__list'>
                    <NavLink className='mobileBar__link' to="/espace-perso" exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Calendar /></span>
                            <span className='mobileBar__text'>Espace <br/>perso</span>
                        </li> 
                    </NavLink> 
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-notes">
                        <li className="mobileBar__item">
                        <span className='mobileBar__icon'><Award /></span>
                            <span className='mobileBar__text'>Notes</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-cours"  exact>
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Server /></span>
                            <span className='mobileBar__text'>Cours / Ressources</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-devoirs">
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Book /></span>
                            <span className='mobileBar__text'>Devoirs / Annonces</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='mobileBar__link' to="/espace-perso/mes-classes">
                        <li className="mobileBar__item">
                            <span className='mobileBar__icon'><Users /></span>
                            <span className='mobileBar__text'>Mes classes</span>
                        </li>                  
                    </NavLink>   
                </ul>
                }
            </nav>
        </div>
  );
}

export default MobileBar;