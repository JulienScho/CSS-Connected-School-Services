import { useDispatch, useSelector } from 'react-redux';
import './style.scss';


const Modal = () => {
    const isModalOpen = useSelector((state) => state.announce.isModalOpen);
    const isResourcesModalOpen = useSelector((state) => state.lesson.modalOpen);
    const currentResource = useSelector((state) => state.lesson.currentResource);
    const dispatch = useDispatch();

    function handleCancelClick(e) {
        if (e.target.className === "modal__container" || e.target.className === "modal__button cancel") {
            dispatch({
                type: 'TOGGLE_MODAL',
            })
        }
    }

    function handleValidateClick(e) {
        
        isResourcesModalOpen ?
            dispatch ({
            type: 'DELETE_RESOURCE',
            id: currentResource.id,   
            })
        :
        dispatch({
            type: 'DELETE_ANNOUNCE_BY_ID',
        })
        dispatch({
            type: 'TOGGLE_MODAL',
        })
        
    }

    return (
        <div onClick={handleCancelClick} className={!isModalOpen ? "modal__container hide" : "modal__container"}>
            <div className={!isModalOpen ? "modal hide" : "modal"} >

                <p className="modal--message">Voulez vous supprimer ce contenu ?</p>

                <div className="modal__button--container">

                    <button className="modal__button cancel">Annuler</button>
                    <button onClick={handleValidateClick} className="modal__button accept">Valider</button>

                </div>

            </div>

        </div>
    )
}

export default Modal;