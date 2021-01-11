import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList({togglePreloader, toggleNotFound, isLoggedIn}) {
    return (
        <>
            <h1 className="news-list__title">Результаты поиска</h1>
            <ul class="news-list">
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn}/>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn}/>
                <NewsCard showAndHidePreloader={togglePreloader} isUserLoggedIn={isLoggedIn}/>
            </ul>
            <button className="news-list__more-button" type="button" onClick={toggleNotFound}>Показать ещё</button>
        </>
    );
}

export default NewsCardList;