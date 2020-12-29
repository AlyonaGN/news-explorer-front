import React from 'react';
import './AppHeader.css';
import Navigation from '../Navigation/Navigation.js';

function AppHeader({ name, onSignout, onAuth, isDarkMode }) {
    return (
        <header className="app-header">
            <p className="app-header__logo">NewsExplorer</p>
            <Navigation />
        </header>
    );
}

export default AppHeader;