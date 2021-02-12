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
import { register, login } from '../../utils/MainApi';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isNotFoundOpen, setNotFoundOpen] = React.useState(false);
  const [isRegPopupOpen, setRegPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isSuccessRegPopupOpen, setSuccessRegPopupOpen] = React.useState(false);
  const [articles, setArticles] = React.useState(null);
  const [isNewsLoading, setNewsLoading] = React.useState(false);
  const [isSearchError, setSearchError] = React.useState(false);
  const [regError, setRegError] = React.useState(null);

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
        setRegError(err.message);
        console.log(err.message);
      });
  }, []);

/*   const prepareAppForLogin = useCallback((jwt) => {
    getContent(jwt)
        .then(async (res) => {
          if (res) {
            setUser(res); 
            const cards = await api.getInitialCards();
            const initialCards = cards.map((initialCard) => {
              return api.createCard(initialCard);
            })
            setCards(initialCards);
            setIsLoading(false);
          }
        })
        .then(() => {
          setLoggedIn(true);
          history.push(ROUTES_MAP.MAIN);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [history]); */

  const handleLoginSubmission = useCallback((email, password) => {
    login(email, password)
    .then((res) => {  
      if (res) {
        prepareAppForLogin(res.token);
        setRegPopupOpen(false);
      } else {
        //history.push(ROUTES_MAP.SIGNIN);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const handleOpenAuth = useCallback(() => {
    setRegError(null);
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
    setLoginPopupOpen(true);
  }, [closeAllPopups]);

  const switchToRegPopup = useCallback(() => {
    closeAllPopups();
    setRegPopupOpen(true);
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
        isRegPopupOpen && 
        <Register onRegister={handleRegisterSubmission} 
                  isPopupOpen={isRegPopupOpen} 
                  handleOverlayClick={handleOverlayClose} 
                  onCloseClick={closeAllPopups}
                  onLoginClick={switchToLoginPopup}
                  registrationError={regError}
          />
      }
       {
        isLoginPopupOpen && 
        <Login isPopupOpen={isLoginPopupOpen} 
                onCloseClick={closeAllPopups}
                onLogin={handleLoginSubmission}
                handleOverlayClick={handleOverlayClose}
                onRegisterClick={switchToRegPopup}
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