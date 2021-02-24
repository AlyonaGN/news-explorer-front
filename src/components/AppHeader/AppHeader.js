import React from 'react';
import './AppHeader.css';
import Navigation from '../Navigation/Navigation.js';

function AppHeader({ onMenuClick, 
                        isMenuShown, 
                        isLoggedIn, 
                        isFontDark, 
                        onAuthClick, 
                        closeMenuOnclick, 
                        onSignOut, 
                        name }) {

    return (
        <div className={isFontDark ? "app-header__container app-header__container_dark": "app-header__container"}>
            <header className={isMenuShown ? "app-header app-header_with-background" : "app-header"}>
                <p className="app-header__logo"> NewsExplorer </p>
                    <div className={isMenuShown ? "app-header__menu app-header__menu_popuped" : "app-header__menu"}>
                        <Navigation isUserLoggedIn={isLoggedIn} 
                                    isMenuDisplayed={isMenuShown} 
                                    isDark={isFontDark} 
                                    onAuth={onAuthClick} 
                                    closeMenu={closeMenuOnclick} 
                                    signOut={onSignOut} 
                                    userName={name}/>
                    </div>
                { isMenuShown ? 
                    <button className="app-header__close-menu-button" onClick={onMenuClick}></button>
                    : 
                    <button className={isFontDark ? "app-header__menu-button app-header__menu-button_dark" : "app-header__menu-button"} onClick={onMenuClick}></button>
                }
            </header>
            <div className={isMenuShown ? "app-header__overlay" : "app-header__overlay app-header__overlay_invisible"}>
            </div>
        </div>
    );
}

export default AppHeader;