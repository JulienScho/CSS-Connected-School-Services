import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AnnounceList from './AnnounceList';
import AnnouncePage from './AnnouncePage';
import AddAnnounce from './AddAnnounce';
import ModifyAnnounce from './ModifyAnnounce';
import Sidebar from '../Sidebar/';
import MobileBar from '../MobileBar';
import E4043 from '../E4043/E4043';


import './style.scss';



const Announce = () => {

    const userRole = useSelector((state) => state.user.roles);


    return (
        <Switch>
            <Route path="/" exact>
                <AnnounceList filter="home" />
            </Route>            
            <Route path="/annonces/categories/:id" exact>
                <AnnounceList filter="categories" />
            </Route>
            <Route path="/annonces" exact>
                <AnnounceList filter="Actualités" />
            </Route>
            {userRole[0] === "ROLE_ADMIN" &&
                <Route path="/annonces/ajout" exact>
                    <div className="main__addannounce">
                    <Sidebar />
                    <div className="pages__content">
                    <AddAnnounce />                    
                    </div>
                    </div>
                    <MobileBar />
                </Route>
            }
            <Route path="/annonces/maj/:id" exact>
                    <div className="main__addannounce">
                    <Sidebar />
                    <div className="pages__content">
                    <ModifyAnnounce />
                    </div>
                    </div>
                    <MobileBar />
            </Route>
            <Route path="/annonces/:id" exact >
                <AnnouncePage />
            </Route>
            <Route>
                <E4043 header={404} />
            </Route>
        </Switch>

    );
};

export default Announce;