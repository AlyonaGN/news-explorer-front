import './App.css';
import '../../index.css';
import { ROUTES_MAP } from '../../utils/routesMap.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
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
      <Switch>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <div className="page__header_saved-news">
              <AppHeader onMenuClick={toggleMenu} 
                          isMenuShown={isMenuOpen} 
                          makeLoggedIn={toggleLoggedIn} 
                          isLoggedIn={true} 
                          isFontDark={true} />
              <SavedNewsHeader />
          </div>
          <SavedNews showAndHidePreloader={togglePreloader}
                    showAndHideNotFound={toggleNotFound}
                    isUserLoggedIn={true}/>
        </Route>
        <Route exact path={ROUTES_MAP.MAIN}>
          <div className="page__header">
              <AppHeader onMenuClick={toggleMenu} 
                          isMenuShown={isMenuOpen} 
                          makeLoggedIn={toggleLoggedIn} 
                          isLoggedIn={isLoggedIn} 
                          isFontDark={false} />
              <SearchForm onSearch={displaySearchResults} />
          </div>
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