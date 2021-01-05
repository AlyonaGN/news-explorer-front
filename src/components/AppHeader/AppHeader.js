import React from 'react';
import './AppHeader.css';
import Navigation from '../Navigation/Navigation.js';

function AppHeader({ onMenuClick, isMenuShown, name, onSignout, onAuth, isDarkMode }) {
    return (
        <>
        <header className={isMenuShown ? "app-header app-header_with-background" : "app-header"}>
            <p className="app-header__logo">NewsExplorer</p>
                <div className="app-header__menu">
                <Navigation handleMenuClick={onMenuClick} isMenuOpened={isMenuShown}/>
                </div>
            <button className={isMenuShown ? "app-header__close-menu-button" : "app-header__menu-button"} onClick={onMenuClick}></button>
        </header>
    
        <div className={isMenuShown ? "app-header__menu_mobile" : "app-header__menu_mobile_invisible"}>
                <Navigation handleMenuClick={onMenuClick} isMenuOpened={isMenuShown}/>
        </div>
        
        <div className={isMenuShown ? "app-header__overlay app-header__overlay_visible" : "app-header__overlay"}></div>
        </>
    );
}

export default AppHeader;