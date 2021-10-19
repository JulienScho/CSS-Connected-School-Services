import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import TextEditor from '../TextEditor/TextEditor';
import FlashMessage from '../FlashMessage/FlashMessage';

import './style.scss';

const AddHomeworks = () => {

    const teacherClassList = useSelector((state) => state.classroom.teacherClassroomList);
    const teacherId = useSelector((state) => state.user.userId);
    const teacherDiscipline = useSelector((state) => state.user.discipline);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(({
            type: "CLEAN_EDITOR_CONTENT",
        }));
    }, []);

    useEffect(() => {
        dispatch(({
            type: "GET_TEACHER_CLASSROOMS_LIST",
            id: teacherId,
        }));
    }, []);

    //-----handle functions-----//
    function handleChangeSelectClass(e) {
        dispatch({
            type: 'CHANGE_ADD_HOMEWORKS_SELECT_CLASSROOM',
            id: e.target.selectedOptions[0].value,
        })
    }
    function handleChangeSelectCategory(e) {
        dispatch({
            type: 'CHANGE_ADD_HOMEWORKS_SELECT_CATEGORY',
            value: e.target.selectedOptions[0].value,
        })
    }
    function handleChangeSelectDate(e) {
        const today = Date.now();
        if (e.target.valueAsNumber < today) {            
            e.target.valueAsNumber = today;
            dispatch({
                type: 'MODIFY_FLASH_MESSAGE',
                value: "La date du contenu ne peut pas être antérieure à la date du jour",
            })            
        }

        dispatch({
            type: 'CHANGE_ADD_HOMEWORKS_SELECT_DATE',
            value: e.target.value
        })
    }
    function handleSubmitHomeworks(e) {
        e.preventDefault();
        dispatch({
            type: 'SEND_HOMEWORKS',
        })

    }

    return (
        <section className="teacherHomeworks">
            <h1 className="teacherHomeworks__title">{teacherDiscipline}</h1>
            <h2 className="teacherHomeworks__subtitle">Devoirs & Annonces de Classes</h2>
            {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}
            <nav className="teacherHomeworks__nav">
                <ul className="teacherHomeworks__navList">
                    <NavLink className="teacherHomeworks__navLink" to="/espace-perso/mes-devoirs/" exact>
                        <li className="teacherHomeworks__navItem">Liste</li>
                    </NavLink>
                    <NavLink className="teacherHomeworks__navLink" to="/espace-perso/mes-devoirs/ajout" exact>
                        <li className="teacherHomeworks__navItem">Ajout</li>
                    </NavLink>
                </ul>
            </nav>
            <form className="addHomeworks__form" onSubmit={handleSubmitHomeworks} >

                <select
                    className="addHomeworks__form select--category"
                    required
                    onChange={handleChangeSelectCategory}
                >
                    <option value={"Devoirs"}>Devoirs</option>
                    <option value={"Annonces"}>Annonces</option>
                </select>


                <select
                    required
                    className="addHomeworks__form select--class"
                    onChange={handleChangeSelectClass}
                >
                    <option value="">Selectionner une classe</option>
                    {
                        teacherClassList[0].map((classRoomObject) => (
                            <option value={classRoomObject.id} key={classRoomObject.id}>
                                {classRoomObject.grade + "ème " + classRoomObject.letter.toUpperCase()}
                            </option>
                        ))}
                </select>

                <input
                    type="date"
                    className="addHomeworks__form select--date"
                    onChange={handleChangeSelectDate}
                />

                <TextEditor />
                {/* modifier les options du text editor enlever image etc */}

                <button
                    className="addHomeworks__form--submit"
                    type="submit"
                >
                    Publier
                </button>

            </form>
        </section>
    );

}

export default AddHomeworks;