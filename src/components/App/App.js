import './App.css';
import '../../index.css';
import { ROUTES_MAP } from '../../utils/routesMap.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SaveButton from '../SaveButton/SaveButton.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Login from '../Login/Login.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import PopupSuccessReg from '../PopupSuccessReg/PopupSuccessReg';
import { newsApi } from '../../utils/NewsApi';
import { register, login, getUserData } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import { getToken, setToken, removeToken } from "../../utils/token";
import { CONSTS } from '../../utils/card-list-consts'

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isNotFoundOpen, setNotFoundOpen] = React.useState(false);
  const [isRegPopupOpen, setRegPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isSuccessRegPopupOpen, setSuccessRegPopupOpen] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [isNewsLoading, setNewsLoading] = React.useState(false);
  const [isSearchError, setSearchError] = React.useState(false);
  const [authSubmissionError, setAuthSubmissionError] = React.useState(null);
  const [currentUser, setUser] = React.useState(null);
  const [isShowMoreButtonNeeded, setShowMoreButtonNeeded] = React.useState(false);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [articlesToDisplay, setArticlesToDisplay] = React.useState([]);


  const displayNews = useCallback((newsFromApi = articles, articlesForDisplaying = articlesToDisplay) => {
    if (newsFromApi.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = newsFromApi.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay([...articlesForDisplaying, ...articlesToShow]);
    }
    else if (newsFromApi.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay([...articlesForDisplaying, ...newsFromApi]);
    }
}, [articlesToDisplay, articles]);
  
/*   const displayInitialCards = useCallback((articlesFromNewsApi) => {
    if (articlesFromNewsApi.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = articlesFromNewsApi.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay(articlesToShow);
    }
    else if (articlesFromNewsApi.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay(articlesFromNewsApi);
    }
  }, []);

  const showMoreCards = useCallback(() => {
    if (articles.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = articles.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay([...articlesToDisplay, ...articlesToShow]);
    }
    else if (articles.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay([...articlesToDisplay, ...articles]);
    }
  }, [articles, articlesToDisplay]); */

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
        displayNews(receivedArticles, []);
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
  }, [displayNews]);

  const closeAllPopups = useCallback(() => {
    setRegPopupOpen(false);
    setSuccessRegPopupOpen(false);
    setLoginPopupOpen(false);
  }, []);

  const handleRegisterSubmission = useCallback((name, email, password) => {
    register(name, email, password)
      .then((res) => {
        if (res) {
          console.log(res);
          setRegPopupOpen(false);
          setSuccessRegPopupOpen(true);
        }
      })
      .catch((err) => {
        setAuthSubmissionError(err.message);
        console.log(err.message);
      });
  }, []);

const prepareAppForLogin = useCallback((jwt) => {
    getUserData(jwt)
        .then((res) => {
          if (res) {
            setUser(res);
            closeAllPopups();
          }
        })
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setAuthSubmissionError(err.message);
          console.log(err);
        });
  }, [closeAllPopups]);

  const handleLoginSubmission = useCallback((email, password) => {
    login(email, password)
    .then((res) => {  
      if (res) {
        prepareAppForLogin(res.token);
        setRegPopupOpen(false);
      }
    })
    .catch((err) => {
      setAuthSubmissionError(err.message);
      console.log(err);
    })
  }, [prepareAppForLogin]);

  const handleOpenAuth = useCallback(() => {
    setAuthSubmissionError(null);
    setLoginPopupOpen(true);
  }, []);

  const handleLoginClick = useCallback(() => {
    setSuccessRegPopupOpen(false);
    setLoginPopupOpen(true);
  }, []);

  const handleOverlayClose = useCallback((e) => {
    if (e.target.classList.contains('popup')) {
        closeAllPopups();
    }
  }, [closeAllPopups]);

  const switchToLoginPopup = useCallback(() => {
    closeAllPopups();
    setAuthSubmissionError(null);
    setLoginPopupOpen(true);
  }, [closeAllPopups]);

  const switchToRegPopup = useCallback(() => {
    closeAllPopups();
    setAuthSubmissionError(null);
    setRegPopupOpen(true);
  }, [closeAllPopups]);

  const handleEscClose = useCallback((e) => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    });
  }, [closeAllPopups]);

  const handleSignOut = useCallback(() => {
    removeToken();
    setIsLoggedIn(false);
    setMenuOpen(false);
  }, []);

  const checkToken = useCallback(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    return jwt;
  }, [setIsLoggedIn]);

  React.useEffect(() => {
    const jwt =  checkToken();
    if (jwt) {
      prepareAppForLogin(jwt);
    }

/*     const articlesFromStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromStorage.length > 0) {
      setArticles(articlesFromStorage);
    } */
    handleEscClose();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <div className="page__header_saved-news">
              <AppHeader onMenuClick={toggleMenu} 
                          isMenuShown={isMenuOpen}
                          isLoggedIn={true} 
                          isFontDark={true}
                          onAuthClick={handleOpenAuth}
                          closeMenuOnclick={closeMenu}
                          onSignOut={handleSignOut} 
              />
              <SavedNewsHeader />
          </div>
          <SavedNews actionButton={<DeleteButton/>}
                    news={savedArticles}/>
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
                          onSignOut={handleSignOut}    
                />
              <SearchForm receiveResults={getNewsFromApi} />
          </div>
          <Main searchResultsErr={isSearchError} 
                isPreloaderShown={isNewsLoading}
                isNotFoundShown={isNotFoundOpen}
                actionButton={<SaveButton isUserLoggedIn={isLoggedIn} />}
                newsToDisplay={articlesToDisplay}
                displayNews={displayNews}
                isMoreButtonDisplayed={isShowMoreButtonNeeded}
          />
        </Route>
      </Switch>
      <Footer />

      {
        isRegPopupOpen && 
        <Register onRegister={handleRegisterSubmission} 
                  isPopupOpen={isRegPopupOpen} 
                  handleOverlayClick={handleOverlayClose} 
                  onCloseClick={closeAllPopups}
                  onLoginClick={switchToLoginPopup}
                  registrationError={authSubmissionError}
          />
      }
       {
        isLoginPopupOpen && 
        <Login isPopupOpen={isLoginPopupOpen} 
                onCloseClick={closeAllPopups}
                onLogin={handleLoginSubmission}
                handleOverlayClick={handleOverlayClose}
                onRegisterClick={switchToRegPopup}
                loginError={authSubmissionError}
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
    </CurrentUserContext.Provider>
  );
}

export default App;