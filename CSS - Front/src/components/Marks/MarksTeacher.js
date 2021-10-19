import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FlashMessage from '../FlashMessage/FlashMessage';

const MarksTeacher = () => {
    const teacherClassList = useSelector((state) => state.classroom.teacherClassroomList);
    const teacherId = useSelector((state) => state.user.userId);
    const studentList = useSelector((state) => state.classroom.currentStudentList);
    const disciplineId = useSelector((state) => state.user.disciplineId);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);

    const marksArray = [];
    const [marksTitle, setMarksTitle] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        //reset student list if teacher changes page and return to marks
        dispatch({
            type: "RESET_STUDENTS_LIST_STATE",
        })
        dispatch({
            type: "GET_TEACHER_CLASSROOMS_LIST",
            id: teacherId,
        });
    }, []);

    function handleChangeSelectClass(e) {
        dispatch({
            type: 'GET_STUDENTS_LIST_BY_CLASS_ID',
            id: e.target.value,
        })
    }

    function handleAddMarks(e) {
        marksArray[e.target.dataset.id.toString()] = {
            id: e.target.dataset.id,
            mark: e.target.value,
        }
    }

    function handleSubmitMarks(e) {
        e.preventDefault();
        dispatch({
            type: 'SEND_MARKS',
            marksArray: marksArray,
            marksTitle: marksTitle,
            disciplineId: disciplineId,
        })
        setMarksTitle("");
    }

    function handleMarksTitleChange(e) {
        setMarksTitle(e.target.value);
    }

    return (
        <section className="teacherMarks">

            {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}

            <form onSubmit={handleSubmitMarks}>
                <h1 className="teacherMarks__title">Notes des élèves</h1>

                <nav className="marks__navlink__container">
                    <ul className="marks__navlink__liste"> 
                        <NavLink className="marks__navlink" to="/espace-perso/mes-notes" exact >
                            <li className="marks__navlink__item">Ajouter des notes</li>
                        </NavLink>
                        <NavLink className="marks__navlink" to="/espace-perso/mes-notes/edition" exact>
                            <li className="marks__navlink__item">Accéder aux notes</li>
                        </NavLink>
                    </ul>
                </nav>

                <select onChange={handleChangeSelectClass} className="teacherMarksClassroom__link">
                    <option value="">Selectionner une classe</option>
                    {teacherClassList[0].map((classroom) => {
                        return (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.grade}ème {classroom.letter.toUpperCase()}
                            </option>)
                    })}
                </select>

                {/* <label htmlFor="label">Intitulé</label> */}
                <input
                    type="text"
                    required
                    className="teacherMarksClassroom__title"
                    id="label"
                    value={marksTitle}
                    placeholder="Titre de la notation"
                    onChange={handleMarksTitleChange}
                />

                {studentList && (
                    <ul className="teacherMarks__list">
                        {studentList.map((student) => {
                            return (
                                <li key={student.id} className="teacherMarks__item" >
                                    <span className="teacherMarks__item--student">
                                        {student.lastname} {student.firstname}
                                    </span>
                                    <input
                                        type="text"
                                        className="teacherMarks__item--input"
                                        onChange={handleAddMarks}
                                        data-fullname={student.lastname + '-' + student.firstname}
                                        data-id={student.id}
                                    />
                                </li>);
                        })}

                    </ul>
                )}
                <button className="teacherMarksClassroom__addBtn" type="submit">Publier</button>
            </form>
        </section>
    )
}

export default MarksTeacher;