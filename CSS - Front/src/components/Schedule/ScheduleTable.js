const ScheduleTable = ({ tableDataTab, userClassroomId }) => {
   
    //let variable to set the timeslot discipline
    let currentDiscipline = "";
    //variable to map result 
    const scheduleTimeSlot = ['08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00'];
    const dayNumber = [1, 2, 3, 4, 5];
    //filter schedule of the classroom from all the schedule data
    const classroomSchedule = tableDataTab.filter((timeSlot) => { return timeSlot.classroom.id === userClassroomId });
    
    return (
        <table className="global-schedule">
            <thead>
                <tr className="global-schedule__title">
                    <th>Lundi</th>
                    <th>Mardi</th>
                    <th>Mercredi</th>
                    <th>Jeudi</th>
                    <th>Vendredi</th>
                </tr>
            </thead>
            <tbody>
                {
                    scheduleTimeSlot.map((timeslot) => {
                        return (
                            <tr key={timeslot}>
                                {dayNumber.map((dayInt) => {
                                    let mapResult = false;

                                    classroomSchedule.map((timeslotData) => {
                                        if (timeslotData.day.id === dayInt && timeslotData.begin === timeslot) {
                                            currentDiscipline = timeslotData.discipline.name
                                            mapResult = true;
                                        }
                                        return false;
                                    })
                                    if (mapResult) { return (
                                        <>
                                            <td key={timeslot + Math.random()} className="global-schedule__date"> {timeslot} <br/> <span className="global-schedule__discipline">{currentDiscipline}</span></td>
                                        </>) } else { return (<td key={timeslot + Math.random()} className="global-schedule__date">{timeslot} <br/><span className="global-schedule__discipline"> - </span></td>) }
                                })}
                            </tr>
                        )
                    })}

            </tbody>
        </table>
    )
};

export default ScheduleTable;