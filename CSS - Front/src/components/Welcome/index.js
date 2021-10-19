// == Import
import { useSelector } from 'react-redux';
import { User } from 'react-feather';

import './style.scss';


// == Composant
const Welcome = () => {
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
  const classroom = useSelector((state) => state.user.classroom);
  const userRole = useSelector((state) => state.user.roles);
  const userDiscipline = useSelector((state)=>state.user.discipline);

  return (
    <div className="welcome">
      <div className="welcome__image"><User /></div>
      <p className="welcome__name">Bonjour <br /> {firstname} {lastname} !</p>
      { userRole[0] === "ROLE_USER" && <p className="welcome__classroom">Ta classe : {classroom}</p>}
      { userRole[0] === "ROLE_TEACHER" && <p className="welcome__classroom">Professeur de : {userDiscipline}</p>}
      { userRole[0] === "ROLE_ADMIN" && <p className="welcome__classroom">Collège Mark Zuckerberg</p>}

    </div>
  );
}
// == Export
export default Welcome;
