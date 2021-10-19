import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import AddHomeworks from "./AddHomeworks";
import StudentHomeworks from './StudentHomeworks';
import TeacherHomeWorks from './TeacherHomeWorks';
import HomeworksList from './HomeworkList';
import HomeworkEdit from './HomeworkEdit';
import E4043 from '../E4043/E4043';

function Homeworks() {

    const userRole = useSelector((state) => state.user.roles);

    return (
        <Switch >
            {userRole[0] === 'ROLE_USER' &&
                <>
                    <Route path="/espace-perso/mes-devoirs">
                        <StudentHomeworks />
                    </Route>
                </>
            }
            {userRole[0] === 'ROLE_TEACHER' &&
                <>
                    <Route path="/espace-perso/mes-devoirs" exact>
                        <TeacherHomeWorks />
                    </Route>

                    <Route path="/espace-perso/mes-devoirs/ajout" exact>
                        <AddHomeworks />
                    </Route>

                    <Route path="/espace-perso/mes-devoirs/liste/:id" exact>
                        <TeacherHomeWorks />
                        <HomeworksList />
                    </Route>
                    <Route path="/espace-perso/mes-devoirs/liste/:id/edit/:homeworkId" exact>
                        <TeacherHomeWorks />                        
                        <HomeworkEdit />
                    </Route>
                    <Route>
                        {/* <E4043 header={404}/> */}
                    </Route>
                </>
            }
        </Switch>
    )

}

export default Homeworks;