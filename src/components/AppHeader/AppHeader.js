import React from 'react';
import './AppHeader.css';
import Navigation from '../Navigation/Navigation.js';

function AppHeader({ onMenuClick, isMenuShown, name, onSignout, onAuth, isDarkMode }) {
    return (
        <header className={isMenuShown ? "app-header app-header_with-background" : "app-header"}>
            <p className="app-header__logo">NewsExplorer</p>
                <Navigation handleMenuClick={onMenuClick} isMenuOpened={isMenuShown}/>
            <button className={isMenuShown ? "app-header__close-menu-button" : "app-header__menu-button"} onClick={onMenuClick}></button>
            <div className={isMenuShown ? "app-header__overlay app-header__overlay_visible" : "app-header__overlay"}></div>
        </header>
    );
}

export default AppHeader;