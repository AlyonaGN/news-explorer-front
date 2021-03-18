import React, { useCallback } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { ROUTES_MAP } from '../../utils/routesMap';
import exitIcon from '../../images/logout.png';
import exitIconDark from '../../images/logout-dark.png';
import { useLocation } from "react-router-dom";



function Navigation({ isUserLoggedIn, 
                        isMenuDisplayed, 
                        isDark, 
                        onAuth, 
                        closeMenu, 
                        signOut, 
                        userName }) {

    const location = useLocation();
    const handleAuthClick = useCallback(() => {
        closeMenu();
        onAuth();
      }, [closeMenu, onAuth]);

      const handleGoToSavedNews = useCallback(() => {
        closeMenu();
      }, [closeMenu]);

    return (
            <nav className={isMenuDisplayed ? "nav-list nav-list_vertical" : "nav-list"}>
                <NavLink className={!isDark && !(location.pathname === ROUTES_MAP.MAIN) ? "nav-list__item nav-list__item_light-theme" : "nav-list__item"}
                    exact to={ROUTES_MAP.MAIN} 
                    activeClassName="nav-list__item_active"
                    onClick={closeMenu}>Главная</NavLink>
                {
                    isUserLoggedIn && <NavLink className={!isDark && !(location.pathname === ROUTES_MAP.SAVED_NEWS) ? "nav-list__item nav-list__item_light-theme" : "nav-list__item"}
                                        activeClassName="nav-list__item_active" 
                                        exact to={ROUTES_MAP.SAVED_NEWS}
                                        onClick={handleGoToSavedNews}>Сохранённые статьи</NavLink>  
                }
                {
                isUserLoggedIn ?
                    <button className={isDark ? "nav-list__exit-button nav-list__exit-button_dark" : "nav-list__exit-button"} onClick={signOut}>
                        {userName}
                        <img className="nav-list__exit-icon" src={isDark && !isMenuDisplayed ? exitIconDark : exitIcon} alt="иконка выхода из профиля"></img>
                    </button>
                    :
                    <button className="nav-list__auth-button" onClick={handleAuthClick}>Авторизоваться</button>
                }
            </nav> 
    );
}

export default Navigation;