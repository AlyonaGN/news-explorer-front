import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';
import SaveButton from '../SaveButton/SaveButton.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';

function NewsCardList({ articlesToDisplay, displayCards, isMoreButtonNeeded, savedArticles, isLoggedIn, handleSaveClick, handleUnsaveClick }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);

    const makeDateFormatted = useCallback((date) => {
        const unformattedDate = new Date(date);
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        return `${unformattedDate.getDate()} ${monthNames[unformattedDate.getMonth()]}, ${unformattedDate.getFullYear()}`

    }, []);

    const handleShowMoreClick = useCallback(() => {
        displayCards();
    }, [displayCards]);
    
    return (
        <>
            <ul className="news-list">
            {
                
                    articlesToDisplay.length !== 0 &&
                    articlesToDisplay.map((article) => {
                        const isNewsSaved = savedArticles.length !== 0 && savedArticles.some((item) => item.link === article.link);

                        return <NewsCard doesKeyWordNeedToBeShown={isSavedNewsOpen ? true : false}
                            actionButton={isSavedNewsOpen ?
                                            <DeleteButton onClick={handleUnsaveClick}/>
                                            :
                                            <SaveButton isUserLoggedIn={isLoggedIn}
                                                        onSave={handleSaveClick}
                                                        onUnsave={handleUnsaveClick}
                                                        isItSaved={isNewsSaved}
                                />
                            }
                            picture={article.image}
                            date={makeDateFormatted(article.date)}
                            title={article.title}
                            summary={article.text}
                            source={article.source}
                            keyWord={article.keyword}
                            url={article.link}
                            key={article.link} />
                    })
            }
            </ul>
            {isMoreButtonNeeded && <button className="news-list__more-button" type="button" onClick={handleShowMoreClick}>Показать ещё</button>}
        </>
    );
}

export default NewsCardList;