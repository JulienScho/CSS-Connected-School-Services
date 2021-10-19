import { NavLink } from "react-router-dom";

import './style.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer__nav">
                <p className="footer__contact">Contact : 
                    <address className="footer__link">
                        <a className="footer__link--mail" href="mailto:admin@css.io">admin@css.io</a>
                    </address>
                </p>
                <NavLink to="/mentions-legales" className="footer__link" exact>Mentions Légales</NavLink>
                <NavLink to="/equipe" className="footer__link" exact>Équipe CSS</NavLink>
            </nav>          
        </footer>
    )
}

export default Footer;