import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { CONSTS } from '../../utils/card-list-consts'
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ actButton, articles }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);
    const [notDisplayedArticlesAmount, setNotDisplayedArticlesAmount] = React.useState(articles.length);
    const [articlesToDisplay, setArticlesToDisplay] = React.useState([]);

    const displayCards = useCallback(() => {
        
        if (notDisplayedArticlesAmount > CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
            const articlesToShow = articles.splice(0, CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
            setArticlesToDisplay([...articlesToDisplay, ...articlesToShow]);
            setNotDisplayedArticlesAmount(notDisplayedArticlesAmount - CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW);
        }
        else if (notDisplayedArticlesAmount <= CONSTS.MAX_CARDS_AMOUNT_IN_A_ROW) {
            setArticlesToDisplay([...articlesToDisplay, ...articles]);
            setNotDisplayedArticlesAmount(notDisplayedArticlesAmount - articles.length)
        }
      }, [articles, notDisplayedArticlesAmount, articlesToDisplay]);

      const makeDateFormatted = useCallback((date) => {
        const unformattedDate = new Date(date);
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", 
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];
       
        return `${unformattedDate.getDate()} ${monthNames[unformattedDate.getMonth()]}, ${unformattedDate.getFullYear()}`
        
      }, []);

    React.useEffect(() => {
        displayCards();
    }, [articles]);

    return (
        <>
            <ul className="news-list">
                {
                    articlesToDisplay &&
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
            {notDisplayedArticlesAmount > 0 && <button className="news-list__more-button" type="button" onClick={displayCards}>Показать ещё</button>}
            </>
    );
}

export default NewsCardList;