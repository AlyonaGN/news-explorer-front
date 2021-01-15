import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ isLoggedIn, actButton }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);

    return (
            <ul className="news-list">
                <NewsCard isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen} actionButton={actButton}/>
                <NewsCard isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen} actionButton={actButton}/>
                <NewsCard isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen} actionButton={actButton}/>
                {isSavedNewsOpen && 
                <>
                <NewsCard isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen} actionButton={actButton}/>
                <NewsCard isUserLoggedIn={isLoggedIn} isItSavedNewsPage={isSavedNewsOpen} actionButton={actButton}/>
                </>}
            </ul>
    );
}

export default NewsCardList;