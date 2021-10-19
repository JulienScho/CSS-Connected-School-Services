import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MobileBar from '../MobileBar/index';
import Sidebar from '../Sidebar/index';
import Schedule from '../Schedule/Index';
import Lessons from '../Lessons/index';
import Homeworks from '../Homeworks/Index';
import Marks from '../Marks/Index';
import DaySchedule from '../Schedule/DaySchedule';
import Welcome from '../Welcome/index';
import Classroom from '../Classroom/Classroom';
import MarksTeacher from '../Marks/MarksTeacher';
import MarksTeacherEdit from '../Marks/MarksTeacherEdit';
import MarksTeacherAverage from '../Marks/MarksTeacherAverage';
import E4043 from '../E4043/E4043';
import MarksStudentAverage from '../Marks/MarksStudentAverage';

import './style.scss';


const Pages = () => {

    const userRole = useSelector((state) => state.user.roles)

    return (
        <div className="pages">
            <Sidebar />
            <div className="pages__content">
                <Switch>
                    <Route path="/espace-perso/" exact>
                        <Welcome />
                        {userRole[0] === "ROLE_USER" &&
                        <div className="student__content">
                            <DaySchedule />
                            <MarksStudentAverage/>
                        </div>}
                        {userRole[0] === "ROLE_TEACHER" && <MarksTeacherAverage />}
                    </Route>
                    <Route path="/espace-perso/mon-emploi-du-temps" exact>
                        <Schedule />
                    </Route>
                    <Route path="/espace-perso/mes-cours" exact>
                        <Lessons />
                    </Route>
                    <Route path="/espace-perso/mes-devoirs">
                        <Homeworks />
                    </Route>
                    <Route path="/espace-perso/mes-classes">
                        <Classroom />
                    </Route>
                    <Route path="/espace-perso/mes-notes" exact>
                        {userRole[0] === "ROLE_USER" && <Marks />}
                        {userRole[0] === "ROLE_TEACHER" && <MarksTeacher />}
                    </Route>
                    <Route path="/espace-perso/mes-notes/edition" exact>
                        {userRole[0] === "ROLE_TEACHER" && <MarksTeacherEdit />}
                    </Route>
                    <Route>
                        <E4043 header={404}/>
                    </Route>
                </Switch>
            </div>
            <MobileBar />
        </div>
    )
}

export default Pages;