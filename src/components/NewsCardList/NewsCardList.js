import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ actButton, articlesToDisplay, displayCards, isMoreButtonNeeded }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);

    const makeDateFormatted = useCallback((date) => {
        const unformattedDate = new Date(date);
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        return `${unformattedDate.getDate()} ${monthNames[unformattedDate.getMonth()]}, ${unformattedDate.getFullYear()}`

    }, []);

    const handleShowMoreClick = useCallback((date) => {
        displayCards();
    }, [displayCards]);
    console.log(articlesToDisplay);
    
    return (
        <>
            <ul className="news-list">
                {
                    articlesToDisplay.length !== 0 &&
                    articlesToDisplay.map((article) => {
                        return <NewsCard  doesKeyWordNeedToBeShown={isSavedNewsOpen} 
                            actionButton={actButton} 
                            picture={article.urlToImage}
                            date={makeDateFormatted(article.publishedAt)}
                            title={article.title}
                            summary={article.description}
                            source={article.source.name}
                            keyWord={article.keyWord} 
                            key={article.url}/>
                    })
                }
            </ul>
            {isMoreButtonNeeded && <button className="news-list__more-button" type="button" onClick={handleShowMoreClick}>Показать ещё</button>}
            </>
    );
}

export default NewsCardList;