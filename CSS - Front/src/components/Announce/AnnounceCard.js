import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { imgUrl } from '../../selectors/baseUrl';

import { Edit, Trash } from 'react-feather';

import schoolPicture from '../../assets/img/school-small.jpeg';


const AnnounceCard = ({ id, title, content, image, categories, date, userRole }) => {
    const dispatch = useDispatch();

    const handleClickDeleteAnnounce = (e) => {
        dispatch({
            type: "TOGGLE_MODAL",           
        })
        dispatch({
            type: "MODIFY_ANNOUNCE_ID_TO_DELETE",
            id: id,           
        })
        //--- confirm now with popup modal ---
        // if (window.confirm('Êtes vous sur de vouloir supprimer cet annonce ?')) {
        //     dispatch({
        //         type: 'DELETE_ANNOUNCE_BY_ID',
        //         id: id,
        //     })
        // }
    }

    return (
        <article className="announce">
            <p className="announce__tag atag">
                {categories.map((categoryObject) =>
                    <Link
                        key={categoryObject.id}
                        to={"/annonces/categories/" + categoryObject.id}>{categoryObject.name}.
                </Link>)}
            </p>

            <NavLink to={"/annonces/" + id} className="announce__image--link">
                <img src={!image ? schoolPicture : imgUrl + image} className="announce--img" alt="" />
            </NavLink>

            <h3 className="announce__title">{title}</h3>
            <div className="announce__footer">

                {userRole[0] === "ROLE_ADMIN" &&
                    <>
                        <Link to={"/annonces/maj/" + id}
                            className="announceCard__button--modify modify" >
                            <button className="announce__icon edit">
                                <span className='announce__icon--edit'> <Edit /> </span>
                            </button>
                        </Link>

                        <button onClick={handleClickDeleteAnnounce} className="announce__icon delete">
                            <span className='announce__icon--delete'> <Trash /> </span>
                        </button>
                    </>}
            </div>
        </article>
    );
};

AnnounceCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.string.isRequired,
};

export default AnnounceCard;