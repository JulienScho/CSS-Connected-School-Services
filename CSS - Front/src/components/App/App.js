// == Import
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../Header/index.js';
import About from '../About/index.js';
import Contact from '../Contact/index.js';
import Modal from '../Modal/Modal';

import usePageTitle from '../../assets/hooks/usePageTitle.js';

import Pages from '../Pages/index.js';

import Intro from '../Intro/index.js';
import Footer from '../Footer/Footer.js';
import Announce from '../Announce/Announce.js';
import Team from '../Team/index.js';
import E4043 from '../E4043/E4043';

import './App.scss';


// == Composant

const App = () => {
  const logged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  usePageTitle(pathname);

  useEffect(() => {
    dispatch({
      type: 'CLOSE_LOGIN_WINDOW',
    });
    window.scroll(0, 0);

    
  }, [pathname]);




  return (
    <div className="App">
      <Modal />
      <Header />
      <main className="main-content">
      <Switch>
        <Route path="/" exact >
          <Intro />
          <Announce />
        </Route>
        <Route path="/a-propos" exact>
          <About />
        </Route>
        <Route path="/annonces/" component={Announce} />
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/equipe" exact>
          <Team />
        </Route>
        <Route path="/espace-perso" >
          {logged ?
            <Pages />:       
            <div>403</div>}   
        </Route>
        <Route>
          <E4043 header={404} />
        </Route>
      </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
