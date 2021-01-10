import './App.css';
import '../../index.css';
import { ROUTES_MAP } from '../../utils/routesMap.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import React, { useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <div className="page__header">
        <AppHeader onMenuClick={toggleMenu} isMenuShown={isMenuOpen} />
        <SearchForm />
      </div>
      <Switch>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <div>SavedNews</div>
        </Route>
        <Route path={ROUTES_MAP.MAIN}>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;