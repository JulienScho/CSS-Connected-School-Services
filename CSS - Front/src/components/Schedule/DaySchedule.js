import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

const DaySchedule = () => {
     
    //Get data by its own to be independant from global schedule
    const currentSchedule = useSelector((state) => state.schedule.schedule);
    const userClassroomId = useSelector((state) => state.user.classroomId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_CURRENT_SCHEDULE',
        });
    }, [dispatch])


    //let variable to set the timeslot discipline
    let currentDiscipline = "";
    //filter schedule of the classroom from all the schedule data
    const classroomSchedule = currentSchedule.filter((timeSlot) => { return timeSlot.classroom.id === userClassroomId });
    //get today day
    const date = new Date();
    const toDayNumber = date.getDay();
    const dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'vendredi', 'Samedi'];
    //variable to map result 
    const scheduleTimeSlot = ['08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00'];
    const dayNumber = [toDayNumber];

    if (toDayNumber === 0 || toDayNumber === 6) {
        return (<h1>C'est le week-end, on travaille un peu et on se repose beaucoup 😎.</h1>)
    } else {
        return (
            <table className = "table-schedule">
                <thead>
                    <tr className = "table-schedule__title">
                        <th colSpan="2">Emploi du temps du jour</th>
                    </tr>
                    <tr className = "table-schedule__subtitle">
                        <th rowSpan="1">Horaires</th>
                        <th className = "table-schedule__subtitle--day" rowSpan="2">{dayName[toDayNumber]}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scheduleTimeSlot.map((timeslot) => {
                            return (
                                    <tr key={timeslot}>
                                        <td>{timeslot}</td>

                                        {dayNumber.map((dayInt) => {
                                            let mapResult = false;

                                            classroomSchedule.map((timeslotData) => {
                                                if (timeslotData.day.id === dayInt && timeslotData.begin === timeslot) {
                                                    currentDiscipline = timeslotData.discipline.name
                                                    mapResult = true;
                                                }
                                                return false;
                                            })
                                            if (mapResult) { return (<td key={Math.random()} >{currentDiscipline}</td>) } else { return (<td key={Math.random()} > - </td>) }
                                        })}
                                       
                                    </tr>
                            )
                        })}

                </tbody>
            </table>
        )
    }
};

export default DaySchedule;