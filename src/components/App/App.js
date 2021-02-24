import './App.css';
import '../../index.css';
import { ROUTES_MAP } from '../../utils/routesMap.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Login from '../Login/Login.js';
import React, { useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import PopupSuccessReg from '../PopupSuccessReg/PopupSuccessReg';
import { newsApi } from '../../utils/NewsApi';
import { register, login, getUserData, getSavedNews, saveNews, unsaveNews } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import { getToken, removeToken } from "../../utils/token";
import { CONSTS } from '../../utils/card-list-consts';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
  const [savedArticlesToDisplay, setSavedArticlesToDisplay] = React.useState([]);

  const history = useHistory();

  const showMoreResults = useCallback(() => {
    if (articles.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = articles.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay([...articlesToDisplay, ...articlesToShow]);
    }
    else if (articles.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay([...articlesToDisplay, ...articles]);
    }
  }, [articlesToDisplay, articles]);

  const showMoreSavedNews = useCallback(() => {
    if (savedArticles.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = savedArticles.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay([...savedArticlesToDisplay, ...articlesToShow]);
    }
    else if (savedArticles.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay([...savedArticlesToDisplay, ...savedArticles]);
    }
  }, [savedArticlesToDisplay, savedArticles]);

  const setInitialStateForResults = useCallback((articles) => {
    if (articles.length > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(true);
      const articlesToShow = articles.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
      setArticlesToDisplay(articlesToShow);
    }
    else if (articles.length <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
      setShowMoreButtonNeeded(false);
      setArticlesToDisplay(articles);
    }
  }, []);

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
      const receivedArticles = await newsApi.getNews(keyWord, fromDate, toDate);
      if (receivedArticles.length !== 0) {
        localStorage.setItem('articles', JSON.stringify(receivedArticles));
        setArticles(receivedArticles);
        setInitialStateForResults(receivedArticles);
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
    setRegPopupOpen(false);
    setSuccessRegPopupOpen(false);
    setLoginPopupOpen(false);
  }, []);

  const handleRegisterSubmission = useCallback((name, email, password) => {
    register(name, email, password)
      .then((res) => {
        if (res) {
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
        .then(async(res) => {
          if (res) {
            setUser(res);
            const savedNews = await getSavedNews(jwt);
            setSavedArticles(savedNews);
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
        localStorage.removeItem('articles');
        setArticles([]);
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

  const handleSaveClick = useCallback((e) => {
      const target = e.target;
      const articleUrl = target.closest("li").dataset.link;
      const articleToSave = articlesToDisplay.find((article) => article.link === articleUrl);
      const { keyword, title, text, date, link, image, source } = articleToSave;
      setSavedArticles([...savedArticles, articleToSave]);
      saveNews(keyword, title, text, date, source, link, image);
  }, [articlesToDisplay, savedArticles]);

  const handleUnsaveClick = useCallback((e) => {
    const target = e.target;
    const articleUrl = target.closest("li").dataset.link;
    const articleToUnsave = savedArticles.find((article) => article.link === articleUrl);
    unsaveNews(articleToUnsave._id)
      .then(() => {
        const updatedSavedNews = savedArticles.filter((news) => news._id !== articleToUnsave._id);
        setSavedArticles(updatedSavedNews);
      })
      .catch((error) => {
        console.log(error);
      });
}, [savedArticles]);

  const handleEscClose = useCallback(() => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    });
  }, [closeAllPopups]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('articles');
    setArticles([]);
    setSavedArticles([]);
    setArticlesToDisplay([]);
    setSavedArticlesToDisplay([]);
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
    const jwt = checkToken();
    if (jwt) {
      prepareAppForLogin(jwt);
    }

    const articlesFromStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromStorage && articlesFromStorage.length > 0) {
      setArticles(articlesFromStorage);
      setInitialStateForResults(articlesFromStorage);
    }
    handleEscClose();

    if (history.location.state && 
        history.location.state.noAuthRedirected && 
        history.action === "REPLACE") {
          setLoginPopupOpen(true);
        }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
      <ProtectedRoute path={ROUTES_MAP.SAVED_NEWS}
                      component={SavedNews} 
                      isUserLoggedIn={isLoggedIn}
                      onMenu={toggleMenu} 
                      isMenuOpened={isMenuOpen}
                      onAuth={handleOpenAuth}
                      closeMenuByClick={closeMenu}
                      signOut={handleSignOut}
                      userName={isLoggedIn ? currentUser.name : ""}
                      amountofSavedNews={savedArticles.length}
                      newsToDisplay={savedArticlesToDisplay}
                      displayNews={showMoreSavedNews} 
                      isMoreButtonNeedToBeSwown={isShowMoreButtonNeeded} 
                      savedNews={savedArticles}
                      onSave={handleSaveClick} 
                      onUnsave={handleUnsaveClick}
                      setAuthPopupOpen={setLoginPopupOpen} />

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
                          name={isLoggedIn ? currentUser.name : ""}    
                />
              <SearchForm receiveResults={getNewsFromApi} />
          </div>
          <Main searchResultsErr={isSearchError}
                isPreloaderShown={isNewsLoading}
                isNotFoundShown={isNotFoundOpen}
                newsToDisplay={articlesToDisplay}
                displayNews={showMoreResults}
                isMoreButtonDisplayed={isShowMoreButtonNeeded}
                savedNews={savedArticles}
                isUserLoggedIn={isLoggedIn} 
                onSave={handleSaveClick} 
                onUnsave={handleUnsaveClick}
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