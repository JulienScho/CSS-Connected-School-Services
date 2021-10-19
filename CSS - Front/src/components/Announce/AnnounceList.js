import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import FlashMessage from '../FlashMessage/FlashMessage';
import Spinner from '../Spinner/Spinner';

import schoolPicture from '../../assets/img/school-small.jpeg';
import AnnounceCard from './AnnounceCard';
import E4043 from '../E4043/E4043';

import './style.scss';

const AnnounceList = ({ filter }) => {
    //collect announce id in url with router hook
    const { id } = useParams();

    const announceList = useSelector((state) => state.announce.announceList);
    const logged = useSelector((state) => state.user.logged);
    const userRole = useSelector((state) => state.user.roles);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);
    //loading state
    const isLoading = useSelector((state) => state.announce.isLoading);
    const isError = useSelector((state) => state.user.isError);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_ANNOUNCE_LIST',
            filter: filter,
            categoryId: id,
        });
    }, [id]);

    // Separate announces and homeworks
    const filteredAnnounceList = announceList.filter((announceObject) => {
        if (announceObject.category[0]) {
            return announceObject.category[0].id !== 7;
        }
        return true;
    });


    // Display 3 announces if homepage
    if (filter === "home") {
        filteredAnnounceList.splice(3);
    }

    // if try to filter announces by category 
     if (filter === 'categories') { 
        // if user is not connected
         if(!logged) {
        return (
            <section className="error" >
                <h3 className="error__title">Vous devez être connecté pour accéder aux annonces par catégories.</h3>
                <Link className="error__link "to="/annonces">Retour aux annonces de l'établissement</Link>
            </section>
        )
    } // if category id doesn't exists
        else if (!Number.isInteger(parseInt(id))){
            return <E4043 header={404} />
        }
    }
        if (!isError) {
        return (
            <>
                {filter === "Actualités" && <h1 className="announces-page__title">Les Actualités</h1>}

                {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}
               
                <section className={filter === "home" ? "announceList--home" : "announceList"}>                    

                    {/* Displays spinner loader when fetching database */}
                    {isLoading && <Spinner />}

                    {/* Avoid displaying empty card during loadin */}
                    {!isLoading &&
                        filteredAnnounceList.map((announceObject) => (
                            <AnnounceCard
                                key={announceObject.id}
                                id={parseInt(announceObject.id, 10)}
                                title={announceObject.title}
                                content={announceObject.content}
                                image={announceObject.image}
                                categories={announceObject.category}
                                date={announceObject.createdAt}
                                userRole={userRole}
                            />)
                        )}
                </section>


            </>
        );
    }
    // if database not responding : error message
    else {
        return (
            <article className="announce">
                <p>Il semble y avoir une erreur au chargement. Merci de réessayer dans quelques instants.</p>
                <img src={schoolPicture} className="announce--img" alt="" />
                <NavLink to="/annonces/" className="announce__image--link">
                    Retour aux annonces
            </NavLink>
            </article>
        )
    }
};

export default AnnounceList;