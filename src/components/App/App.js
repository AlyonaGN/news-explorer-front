import './App.css';
import '../../index.css';
import { ROUTES_MAP } from '../../utils/routesMap.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SaveButton from '../SaveButton/SaveButton.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import PopupSuccessReg from '../PopupSuccessReg/PopupSuccessReg';
import { newsApi } from '../../utils/NewsApi';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isNotFoundOpen, setNotFoundOpen] = React.useState(false);
  const [isPopupWithFormOpen, setPopupWithFormOpen] = React.useState(false);
  const [isSuccessRegPopupOpen, setSuccessRegPopupOpen] = React.useState(false);

  const [articles, setArticles] = React.useState(null);
  const [isNewsLoading, setNewsLoading] = React.useState(false);
  const [isSearchError, setSearchError] = React.useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleLoggedIn = useCallback(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);

  const getNewsFromApi = useCallback(async (keyWord, fromDate, toDate) => {
    setNewsLoading(true);
    try {
      const res = await newsApi.getNews(keyWord, fromDate, toDate);
      const receivedArticles = Array.from(res.articles);
      localStorage.setItem('articles', JSON.stringify(receivedArticles));
      if (receivedArticles.length !== 0) {
        receivedArticles.forEach((article) => {
          article.keyWord = keyWord;
        });
        setArticles(receivedArticles);
        setNewsLoading(false);
        setNotFoundOpen(false);
        setSearchError(false);
      }
      else {
        setNewsLoading(false);
        setNotFoundOpen(true);
        setSearchError(false);
      }
    }
    catch(err) {
      setNotFoundOpen(false);
      setNewsLoading(false);
      setSearchError(true);
      console.log(err);
    }
  }, []);

  const closeAllPopups = useCallback(() => {
    console.log(articles);
    setPopupWithFormOpen(false);
    setSuccessRegPopupOpen(false)
  }, [articles]);

  const handleRegisterSubmission = useCallback(() => {
    setPopupWithFormOpen(false);
    setSuccessRegPopupOpen(true);
  }, []);

  const handleLoginSubmission = useCallback(() => {
    setPopupWithFormOpen(false);
  }, []);

  const handleOpenAuth = useCallback(() => {
    setPopupWithFormOpen(true);
  }, []);

  const handleLoginClick = useCallback(() => {
    setSuccessRegPopupOpen(false);
    setPopupWithFormOpen(true);
  }, []);

  const handleOverlayClose = useCallback((e) => {
    if (e.target.classList.contains('popup')) {
        closeAllPopups();
    }
  }, [closeAllPopups]);

  const handleEscClose = useCallback((e) => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    });
  }, [closeAllPopups]);

  React.useEffect(() => {
    const articlesFromStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromStorage.length > 0) {
      setArticles(articlesFromStorage);
    }
    handleEscClose();
  }, []);

  return (
    <>
      <Switch>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <div className="page__header_saved-news">
              <AppHeader onMenuClick={toggleMenu} 
                          isMenuShown={isMenuOpen} 
                          makeLoggedIn={toggleLoggedIn} 
                          isLoggedIn={true} 
                          isFontDark={true}
                          onAuthClick={handleOpenAuth}
                          closeMenuOnclick={closeMenu} 
              />
              <SavedNewsHeader />
          </div>
          <SavedNews isUserLoggedIn={true}
                    actionButton={<DeleteButton/>}/>
        </Route>
        <Route exact path={ROUTES_MAP.MAIN}>
          <div className="page__header">
              <AppHeader onMenuClick={toggleMenu} 
                          isMenuShown={isMenuOpen} 
                          makeLoggedIn={toggleLoggedIn} 
                          isLoggedIn={isLoggedIn} 
                          isFontDark={false} 
                          onAuthClick={handleOpenAuth}
                          closeMenuOnclick={closeMenu}    
                />
              <SearchForm receiveResults={getNewsFromApi} />
          </div>
          <Main searchResultsErr={isSearchError} 
                isPreloaderShown={isNewsLoading}
                isNotFoundShown={isNotFoundOpen}
                actionButton={<SaveButton isUserLoggedIn={isLoggedIn} />}
                news={articles}
          />
        </Route>
      </Switch>
      <Footer />

      {
        isPopupWithFormOpen && 
        <PopupWithForm isOpen={isPopupWithFormOpen} 
                        onClose={closeAllPopups} 
                        onRegister={handleRegisterSubmission}
                        onLogin={handleLoginSubmission}
                        onOverlayAndEscClick={handleOverlayClose}
          />
      }
      {
        isSuccessRegPopupOpen && 
        <PopupSuccessReg isOpen={isSuccessRegPopupOpen} 
                        onClose={closeAllPopups} 
                        onLogin={handleLoginClick}
                        onOverlayAndEscClick={handleOverlayClose}
          />
      }
    </>
  );
}

export default App;