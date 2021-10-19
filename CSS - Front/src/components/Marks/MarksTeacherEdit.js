import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const MarksTeacherEdit = () => {
    const teacherClassList = useSelector((state) => state.classroom.teacherClassroomList);
    const teacherId = useSelector((state) => state.user.userId);
    const studentList = useSelector((state) => state.classroom.currentStudentList);
    const marksListByClassroom = useSelector((state) => state.marks.marksListByClassroom);
    const teacherDisciplineId = useSelector((state)=> state.user.disciplineId)
    //local state to display data in modal and send them to patch request
    const [selectedMark, setSelectedMark] = useState("");
    const [isMarkModalOpen, toggleMarkModal] = useState(false);
    const [selectedsStudent, setSelectedStudent] = useState("")
    const [selectedMarkTitle, setSelectedMarkTitle] = useState("");
    const [selectedMarkId, setselectedMarkId] = useState("");
    const [classroomId, setClassroomId] = useState("");

    console.log(marksListByClassroom);

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

        dispatch({
            type: 'GET_STUDENTS_MARKS_BY_CLASS_ID',
            id: e.target.value,
        })
        //keep classroom id to refresh list if editing marks
        setClassroomId(e.target.value)
    }

    function handleClickStudentMark(e) {
        setSelectedMark(e.target.textContent);
        setSelectedStudent(e.target.dataset.student);
        setSelectedMarkTitle(e.target.title);
        setselectedMarkId(e.target.dataset.markid);

        //open modal to edit selected mark
        toggleMarkModal(!isMarkModalOpen);
    }

    function handleChangeMarkInModal(e) {
        setSelectedMark(e.target.value);
    }

    function handleClickCancelChangeMark(e) {
        toggleMarkModal(!isMarkModalOpen);
    }

    function handleSubmitNewMark(e) {
        e.preventDefault();
        dispatch({
            type: 'EDIT_STUDENT_MARK',
            markId: selectedMarkId,
            mark: selectedMark,
            classroomId: classroomId,
        })
        toggleMarkModal(!isMarkModalOpen);

    }

    return (
        <section className="teacherMarks">
            {isMarkModalOpen &&
                <div className="teacherMarks__modal__container">
                    <form className="teacherMarks__modal" onSubmit={handleSubmitNewMark} >
                        <p>Modifier la note de {selectedsStudent} pour : "{selectedMarkTitle}" ?</p>

                        <input onChange={handleChangeMarkInModal} type="number" value={selectedMark} />

                        <div className="teacherMarks__modal__button--container">
                            <input
                                onClick={handleClickCancelChangeMark}
                                type="button"
                                value="Annuler"
                                className="teacherMarks__modal__button cancel"
                            />
                            <input
                                type="submit"
                                value="Valider"
                                className="teacherMarks__modal__button accept"
                            />
                        </div>

                    </form>
                </div>
            }
            <form>
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

                {studentList && (
                    <ul className="teacherMarks__list">
                        {studentList.map((student) => {
                            return (
                                <li className="teacherMarks__item" key={student.id}>
                                    <div className="teacherMarks__studentName">
                                        {student.lastname} {student.firstname} :
                                    </div>
                                    <div className="teacherMarks__numberContent">
                                    {marksListByClassroom.map((mark) => {
                                        if(mark.discipline.id === teacherDisciplineId){
                                        return mark.user.id === student.id ?
                                            <button
                                                type="button"
                                                className="teacherMarks__number"
                                                key={mark.id}
                                                onClick={handleClickStudentMark}
                                                title={mark.title}
                                                data-student={student.firstname + " " + student.lastname}
                                                data-markid={mark.id}
                                            >{mark.grade} 
                                            </button> : "";}
                                    })}
                                    </div>
                                </li>);
                        })}

                    </ul>
                )}
            </form>
        </section>
    )
}

export default MarksTeacherEdit;