import React from 'react';
import './AppHeader.css';
import Navigation from '../Navigation/Navigation.js';

function AppHeader({ onMenuClick, isMenuShown, makeLoggedIn, isLoggedIn }) {
    return (
        <div className="app-header__container">
            <header className={isMenuShown ? "app-header app-header_with-background" : "app-header"}>
                <p className="app-header__logo" onClick={makeLoggedIn}>NewsExplorer</p>
                    <div className={isMenuShown ? "app-header__menu app-header__menu_popuped" : "app-header__menu"}>
                        <Navigation isUserLoggedIn={isLoggedIn} isMenuDisplayed={isMenuShown}/>
                    </div>
                <button className={isMenuShown ? "app-header__close-menu-button" : "app-header__menu-button"} onClick={onMenuClick}></button>
            </header>
            <div className={isMenuShown ? "app-header__overlay" : "app-header__overlay app-header__overlay_invisible"}>
            </div>
        </div>
    );
}

export default AppHeader;