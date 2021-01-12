import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({togglePreloader, isLoggedIn}) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);

    return (
            <ul className="news-list">
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen}/>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen}/>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen}/>
                {isSavedNewsOpen && 
                <>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen}/>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen}/>
                </>}
            </ul>
    );
}

export default NewsCardList;