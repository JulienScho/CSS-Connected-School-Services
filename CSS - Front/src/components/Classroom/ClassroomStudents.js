import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import E4043 from '../E4043/E4043';

const ClassroomStudent = () => {
    const studentList = useSelector((state) => state.classroom.currentStudentList);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_STUDENTS_LIST_BY_CLASS_ID',
            id: id,
        })
    },[id]);

    if (!Number.isInteger(parseInt(id))){
        return <E4043 header={404} />
    } else {

    return (
        <ul className="students__list">
            {studentList.map((student) => {
                return (
                <li className="students__item" key={student.id}> {student.lastname} {student.firstname}</li>
                )
            })}
        </ul>
    );}
}

export default ClassroomStudent;