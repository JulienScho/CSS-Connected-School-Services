import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextEditor from '../TextEditor/TextEditor';

const HomeworkEdit = () => {

    const { homeworkId } = useParams();
    const dispatch = useDispatch();
    const editHomework = useSelector((state) => state.announce.editHomework);

    useEffect(() => {
        dispatch({
            type: 'GET_HOMEWORK_BY_ID',
            id: homeworkId,
        })
    }, [homeworkId])

    function handleSubmitHomework(e) {
        e.preventDefault();
        dispatch({
            type: 'EDIT_HOMEWORK',
            id: homeworkId,
        })
    }

    return (
        <>{editHomework &&
            <form className="homework__formEdit" onSubmit={handleSubmitHomework}>
                <TextEditor />
                <button className="homework__btnEdit" type="submit" value="Enregistrer">
                    Publier
                </button>
            </form>
            }
        </>
    )

}

export default HomeworkEdit;