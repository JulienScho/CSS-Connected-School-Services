import './style.scss';

const Spinner = () => {
    return (
        <div className="spinner__container">
        <div className="spinner"><div></div><div></div></div>
        <p className="spinner__text">
        Chargement
        </p>
        </div>
    )
}

export default Spinner;