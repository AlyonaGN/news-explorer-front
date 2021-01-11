import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { ROUTES_MAP } from '../../utils/routesMap';
import exitIcon from '../../images/logout.png';


function Navigation({ isUserLoggedIn, isMenuDisplayed }) {
    return (
            <nav className={isMenuDisplayed ? "nav-list nav-list_vertical" : "nav-list"}>
                <NavLink className="nav-list__item" to={ROUTES_MAP.MAIN} activeClassName="nav-list__item_active">Главная</NavLink>
                {
                    isUserLoggedIn && <NavLink className="nav-list__item" to={ROUTES_MAP.SAVED_NEWS} activeClassName="nav-list__item_active">Сохранённые статьи</NavLink>  
                }
                {
                isUserLoggedIn ?
                    <button className="nav-list__exit-button">Грета<img className="nav-list__exit-icon" src={exitIcon} alt="иконка выхода из профиля"></img></button>
                    :
                    <button className="nav-list__auth-button">Авторизоваться</button>
                }
            </nav> 
    );
}

export default Navigation;