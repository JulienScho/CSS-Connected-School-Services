import './style.scss';
import imageError from '../../assets/img/404.png';
const { Link } = require("react-router-dom");


const E4043 = ({header}) => {
    if(header === 403){
        return (
            <div className="4043">
                <h1 className="4043__Title">Vous n'avez pas les droits nécessaire pour accéder à ce contenu</h1>
                <Link className="4043__link" to="/" >Retour à l'accueil</Link>
            </div>
        );
    } else if (header === 404) {
       return ( 
           <div  className="error404">
                <div className="error404__element1">
                    <p className="error404__titleMessage">Oups !</p>
                    <p className="error404__message">La page que vous recherchez semble introuvable</p>
                    <Link className="error404__link" to="/" >Retour à l'accueil</Link>

                </div>
                <div className="error404__element2">
                    <p className="error404__text">202 + 202 =</p>
                    <h1 className="error404__title">404</h1>
                    <img src={imageError} className="error404__image" alt="" />
                </div>
            </div>
    );
    }
}

export default E4043;