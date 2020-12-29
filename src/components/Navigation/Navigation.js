import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { ROUTES_MAP } from '../../utils/routesMap';

function Navigation({ name, onSignout, onAuth, isDarkMode }) {
    return (
        <nav className="nav__list">
            <NavLink className="nav__list-item" to={ROUTES_MAP.MAIN} activeClassName="nav__list-item_active">Главная</NavLink>
            {
                name && <NavLink className="nav__list-item" to={ROUTES_MAP.SAVED_NEWS} activeClassName="nav-list__item_active">Сохранённые статьи</NavLink>  
            }
            {
            name ?
                <button className="nav__exit-button" onClick={onSignout}>{name}<img src="#" alt="иконка выхода из профиля"></img></button>
                :
                <button className="nav__auth-button" onClick={onAuth}>Авторизоваться</button>
            }
        </nav>
    );
}

export default Navigation;