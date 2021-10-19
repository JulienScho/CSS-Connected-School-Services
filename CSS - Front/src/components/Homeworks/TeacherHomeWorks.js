import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import FlashMessage from '../FlashMessage/FlashMessage';

import './style.scss';


const TeacherHomeWorks = () => {

    const teacherClassList = useSelector((state) => state.classroom.teacherClassroomList);
    const teacherId = useSelector((state) => state.user.userId);
    const teacherDiscipline = useSelector((state) => state.user.discipline);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(({
            type: "GET_TEACHER_CLASSROOMS_LIST",
            id: teacherId,
        }));
    }, []);

    return (
        <section className="teacherHomeworks">
            <h1 className="teacherHomeworks__title">{teacherDiscipline}</h1>
            <h2 className="teacherHomeworks__subtitle">Devoirs & Annonces de Classes</h2>
            <nav className="teacherHomeworks__nav">
                <ul className="teacherHomeworks__navList">
                    <NavLink className="teacherHomeworks__navLink"  to="/espace-perso/mes-devoirs/" >
                        <li className="teacherHomeworks__naItem">Liste</li>
                    </NavLink>
                    <NavLink className="teacherHomeworks__navLink"  to="/espace-perso/mes-devoirs/ajout" exact>
                        <li className="teacherHomeworks__navItem">Ajout</li>
                    </NavLink>
                </ul>
            </nav>
            <p className="teacherHomeworks__info"> Selectionnez une classe pour voir l'ensemble des devoirs & annonces</p>
            <ul className="teacherHomeworks__classroomList">
                {teacherClassList[0].map((classroom) => {
                    return (
                        <li className="teacherHomeworks__classroomItem" key={classroom.id}>
                            <NavLink
                                className="teacherHomeworks__classroomLink"
                                exact
                                to={"/espace-perso/mes-devoirs/liste/" + classroom.id}
                            >{classroom.grade}ème {classroom.letter.toUpperCase()}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}
        </section>
    )
}

export default TeacherHomeWorks;

