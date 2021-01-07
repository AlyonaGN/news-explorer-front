import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { ROUTES_MAP } from '../../utils/routesMap';

function Navigation({ handleMenuClick, isMenuOpened, name, onSignout, onAuth, isDarkMode }) {
    return (
            <nav className="nav-list">
                <NavLink className="nav-list__item" to={ROUTES_MAP.MAIN} activeClassName="nav-list__item_active">Главная</NavLink>
                {
                    name && <NavLink className="nav-list__item" to={ROUTES_MAP.SAVED_NEWS} activeClassName="nav-list__item_active">Сохранённые статьи</NavLink>  
                }
                {
                name ?
                    <button className="nav-list__exit-button" onClick={onSignout}>{name}<img src="#" alt="иконка выхода из профиля"></img></button>
                    :
                    <button className="nav-list__auth-button" onClick={onAuth}>Авторизоваться</button>
                }
            </nav> 
    );
}

export default Navigation;