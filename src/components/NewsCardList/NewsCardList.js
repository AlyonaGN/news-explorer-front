import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ isLoggedIn, actButton, articles }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);
    const [notDisplayedArticlesAmount, setNotDisplayedArticlesAmount] = React.useState(articles.length);
    const [articlesToDisplay, setArticlesToDisplay] = React.useState([]);

    const displayCards = useCallback(() => {
        
        if (notDisplayedArticlesAmount > 3) {
            const articlesToShow = articles.splice(0, 3);
            setArticlesToDisplay([...articlesToDisplay, ...articlesToShow]);
            setNotDisplayedArticlesAmount(notDisplayedArticlesAmount - 3);
        }
        else if (notDisplayedArticlesAmount <= 3) {
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
        console.log(notDisplayedArticlesAmount);
    }, []);

    console.log(articles);
    console.log(articlesToDisplay);

    return (
        <>
            <ul className="news-list">
                {/* isItSavedNews ?  */
                    articlesToDisplay &&
                    articlesToDisplay.map((article) => {
                        console.log(article);
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