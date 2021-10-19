import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { imgUrl } from '../../selectors/baseUrl'
import TextEditor from 'react-quill';
import Spinner from '../Spinner/Spinner'
import { Edit, Trash } from 'react-feather';
import E4043 from '../E4043/E4043';

import schoolPicture from '../../assets/img/school-small.jpeg'

const AnnouncePage = () => {
    //collect announce id in url with router hook
    const { id } = useParams();

    const userRole = useSelector((state) => state.user.roles);
    const currentAnnounce = useSelector((state) => state.announce.currentAnnounce);
    const isLoading = useSelector((state) => state.announce.isLoading);

    const handleClickDeleteAnnounce = (e) => {
        dispatch({
            type: "TOGGLE_MODAL",
        })
        dispatch({
            type: "MODIFY_ANNOUNCE_ID_TO_DELETE",
            id: id,
        })
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_ANNOUNCE_BY_ID',
            id: id,
        });
    }, []);
    
    if (isLoading) {
        return (
            <section className="announcePage">
                <Spinner />
            </section>
        )
    } else if (!Number.isInteger(parseInt(id))){
        return <E4043 header={404} />
    }else {

        return (
            <section className="announcePage">
                <p className="announcePage__tag atag">
                    {currentAnnounce.category.map((categoryObject) =>
                        <Link
                            key={categoryObject.id}
                            to={"/annonces/categories/" + categoryObject.id}>{categoryObject.name}.
                </Link>)}
                </p>
                <img
                    src={
                        currentAnnounce.image &&
                            currentAnnounce.image[0] === '' ? schoolPicture : imgUrl + currentAnnounce.image
                    }
                    alt=""
                    className="announcePage__img"
                />
                <h1 className="announcePage__title">{currentAnnounce.title}</h1>
                {/*
            TextContent is now displayed with TextEditor
             <p className="announce__content" >{currentAnnounce.content} </p>
             */}

                <TextEditor
                    value={currentAnnounce.content}
                    readOnly={true}
                    theme={"bubble"}
                />

                <span className="announcePage__date">{currentAnnounce.date}</span>

                {userRole[0] === "ROLE_ADMIN" &&
                    <div className="announcePage_icon__container">
                        <Link to={"/annonces/maj/" + id}>
                            <button className="announcePage__icon edit">
                            <Edit /> <span className='announcePage__icon--edit'> Editer  </span>
                            </button>
                        </Link>

                        <button onClick={handleClickDeleteAnnounce} className="announcePage__icon delete">
                            <span className='announcePage__icon--delete'>  Supprimer </span><Trash />
                        </button>
                    </div>}

                    <Link className="announcePage__return" to="/annonces">Retour à la liste des annonces ></Link>
            </section>
        );
    }
};

export default AnnouncePage;