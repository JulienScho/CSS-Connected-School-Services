import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import TextEditor from 'react-quill';
import { Trash, Edit } from 'react-feather';

const HomeworksList = () => {
    const { id } = useParams();    

    const announceListByClassId = useSelector((state) => state.announce.classroomAnnounces);
    const teacherDiscipline = useSelector((state) => state.user.discipline);
    const userRole = useSelector((state) => state.user.roles);

    const dispatch = useDispatch();

    //function to convert database-numbers-date in french-words
    function dateConverter(currentDate) {
        const date = new Date(currentDate);
        const options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
        return date.toLocaleDateString("fr-FR", options);
    }

    //Collect class announces 
    useEffect(() => {
        dispatch({
            type: 'GET_ANNOUNCE_LIST_BY_CLASS_ID',
            id: id,
        })
    }, [id])

    const handleClickDeleteHomework = (e) => {
        dispatch({
            type: "TOGGLE_MODAL",
        })
        dispatch({
            type: "MODIFY_ANNOUNCE_ID_TO_DELETE",
            id: e.target.dataset.id,
            contentCategory: "homeworkList",
            currentContentId: id,
        })
    }

    return (
        <ul className="homeworks">

            {announceListByClassId.map((announceObject) => {

                if (announceObject.title.includes(teacherDiscipline)) {
                    return (

                        <li key={announceObject.id} className="homework__article">
                            {userRole[0] === 'ROLE_TEACHER' &&
                                <div className="homeworkList__button__container">
                                    <Link to={"/espace-perso/mes-devoirs/liste/" + id + "/edit/" + announceObject.id} >
                                        <button
                                            data-id={announceObject.id}
                                            type="button"
                                            className="homeworkList__btnEdit"
                                        ><Edit />
                                        </button>
                                    </Link>
                                    <button
                                        data-id={announceObject.id}
                                        onClick={handleClickDeleteHomework}
                                        type="button"
                                        className="homeworkList__btnDelete"
                                    ><Trash data-id={announceObject.id} /></button>
                                </div>
                            }
                            <p className="homework__article__expiration">
                                - Pour le <span className="homework__article__date">
                                    {announceObject.expireAt ? dateConverter(announceObject.expireAt) : "prochain cours"}
                                </span>
                            </p>

                            <TextEditor
                                value={announceObject.homework}
                                readOnly={true}
                                theme={"bubble"}
                            />
                        </li>
                    )
                }
                return true
            }
            )}
        </ul>
    );
}

export default HomeworksList;