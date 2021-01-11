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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPreloaderOpen, setPreloaderOpen] = React.useState(false);
  const [isNotFoundOpen, setNotFoundOpen] = React.useState(false);
  const [areSearchResultsDisplayed, setSearchResultsDisplayed] = React.useState(false);

  React.useEffect(() => {
    
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const toggleLoggedIn = useCallback(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);

  const displaySearchResults = useCallback(() => {
    setSearchResultsDisplayed(!areSearchResultsDisplayed);
  }, [areSearchResultsDisplayed]);

  const togglePreloader = useCallback(() => {
    displaySearchResults();
    setPreloaderOpen(!isPreloaderOpen);
  }, [isPreloaderOpen, displaySearchResults]);

  const toggleNotFound = useCallback(() => {
    displaySearchResults();
    setNotFoundOpen(!isNotFoundOpen);
  }, [isNotFoundOpen, displaySearchResults]);

  return (
    <>
      <div className="page__header">
        <AppHeader onMenuClick={toggleMenu} isMenuShown={isMenuOpen} makeLoggedIn={toggleLoggedIn} isLoggedIn={isLoggedIn} />
        <SearchForm onSearch={displaySearchResults} />
      </div>
      <Switch>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <div>SavedNews</div>
        </Route>
        <Route path={ROUTES_MAP.MAIN}>
          <Main areResultsShown={areSearchResultsDisplayed} 
                isPreloaderShown={isPreloaderOpen} 
                showAndHidePreloader={togglePreloader}
                showAndHideNotFound={toggleNotFound}
                isNotFoundShown={isNotFoundOpen}
                isUserLoggedIn={isLoggedIn}
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;