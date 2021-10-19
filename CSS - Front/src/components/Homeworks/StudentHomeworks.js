import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from 'react-quill';

function StudentHomeworks() {
    const userClassroomId = useSelector((state) => state.user.classroomId);
    const announceListByClassId = useSelector((state) => state.announce.classroomAnnounces);
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
            id: userClassroomId,
        })
    }, [dispatch, userClassroomId])


    return (
        <div className="homeworks">
            <h1>Mes Devoirs</h1>
            {announceListByClassId.map((announceObject) => (
                <article key={announceObject.id} className="homeworks__article">
                <div className='homeworks__left'>
                    <p className="homeworks__article__expiration">Pour le<br/><span className="homeworks__article__date">
                        {announceObject.expireAt ? dateConverter(announceObject.expireAt) : "prochain cours"}
                    </span>
                    </p>
                </div>
                <div className='homeworks__right'>
                    <h3 className="homeworks__article__title">{announceObject.title}</h3>
                    <TextEditor
                    value={announceObject.homework}
                    readOnly={true}
                    theme={"bubble"}
                    className="homeworks__article__content"
                />
                </div>
                </article>
            )
            )}
        </div>
    );
}

export default StudentHomeworks;