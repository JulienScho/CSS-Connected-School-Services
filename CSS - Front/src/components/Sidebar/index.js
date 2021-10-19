import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { boUrl } from '../../selectors/baseUrl';
import { Calendar, Users, Book, Server, Award, User, ExternalLink } from 'react-feather';

import './style.scss';


const Sidebar = ()  => {
    const roleStudent = useSelector((state) => state.user.roles.includes('ROLE_USER'));
    const roleAdmin = useSelector((state) => state.user.roles.includes('ROLE_ADMIN'));
    const roleTeacher = useSelector((state) => state.user.roles.includes('ROLE_TEACHER'));


    return (
        
        <div className="sidebar">
            <nav className='sidebar__menu'>
                {roleStudent && // if I am a student
                <ul className='sidebar__list'>
                    <NavLink className='sidebar__link' to="/espace-perso" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><User /></span>
                            <span className='sidebar__text'>Espace perso</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mon-emploi-du-temps" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Calendar /></span>
                            <span className='sidebar__text'>Mon emploi du temps</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-cours" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Book /></span>
                            <span className='sidebar__text'>Mes cours</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-devoirs" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Server /></span>
                            <span className='sidebar__text'>Mon agenda</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-notes" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Award /></span>
                            <span className='sidebar__text'>Mes notes</span>
                        </li>                  
                    </NavLink>   
                </ul>
                }
                {roleAdmin && // if I am an admin
                <ul className='sidebar__list'>
                    <NavLink className='sidebar__link' to="/espace-perso" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><User /></span>
                            <span className='sidebar__text'>Espace perso</span>
                        </li> 
                    </NavLink>    
                    <NavLink className='sidebar__link' to="/annonces/ajout" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Server /></span>
                            <span className='sidebar__text'>Gestion des Annonces</span>
                        </li>   
                    </NavLink>   
                    <a className='sidebar__link' href={boUrl} target="_blank" rel="noreferrer">
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><ExternalLink /></span>
                            <span className='sidebar__text'>Accès Back-Office </span>
                        </li>                  
                    </a>   
                </ul>
                }
                {roleTeacher && //if I am a teacher
                <ul className='sidebar__list'>
                <NavLink className='sidebar__link' to="/espace-perso" exact>
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><User /></span>
                            <span className='sidebar__text'>Espace perso</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-notes">
                        <li className="sidebar__item">
                        <span className='sidebar__icon'><Award /></span>
                            <span className='sidebar__text'>Notes</span>
                        </li> 
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-cours" >
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Server /></span>
                            <span className='sidebar__text'>Cours / Ressources</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-devoirs">
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Book /></span>
                            <span className='sidebar__text'>Devoirs / Annonces</span>
                        </li>   
                    </NavLink>   
                    <NavLink className='sidebar__link' to="/espace-perso/mes-classes">
                        <li className="sidebar__item">
                            <span className='sidebar__icon'><Users /></span>
                            <span className='sidebar__text'>Mes classes</span>
                        </li>                  
                    </NavLink>   
                </ul>
                }
            </nav>
        </div>
  );
}

export default Sidebar;