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
  const [areSearchResultsDisplayed, setSearchResultsDisplayed] = React.useState(false);

  const [isPopupWithFormOpen, setPopupWithFormOpen] = React.useState(false);
  const [isSuccessRegPopupOpen, setSuccessRegPopupOpen] = React.useState(false);

  const [articles, setArticles] = React.useState(null);

  const [isNewsLoading, setNewsLoading] = React.useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleLoggedIn = useCallback(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);

  const getNewsFromApi = useCallback((keyWord, fromDate, toDate) => {
    setNewsLoading(true);
    newsApi.getNews(keyWord, fromDate, toDate).then((res) => {
      const receivedArticles = Array.from(res.articles);
      if (receivedArticles.length !== 0) {
        setNewsLoading(false);
        setSearchResultsDisplayed(true);
      }
      else {
        setNewsLoading(false);
        setNotFoundOpen(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const displaySearchResults = useCallback((keyWord, fromDate, toDate) => {
    getNewsFromApi(keyWord, fromDate, toDate);
  }, [getNewsFromApi]);

  const closeAllPopups = useCallback(() => {
    setPopupWithFormOpen(false);
    setSuccessRegPopupOpen(false)
  }, []);

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
    
    handleEscClose();
  }, [handleEscClose]);

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
              <SearchForm onSearch={displaySearchResults} />
          </div>
          <Main areResultsShown={areSearchResultsDisplayed} 
                isPreloaderShown={isNewsLoading}
                isNotFoundShown={isNotFoundOpen}
                isUserLoggedIn={isLoggedIn}
                actionButton={<SaveButton isUserLoggedIn={isLoggedIn}/>}
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