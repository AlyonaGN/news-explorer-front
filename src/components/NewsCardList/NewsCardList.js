import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ isLoggedIn, actButton, articles }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);
    const [notDisplayedArticlesAmount, setNotDisplayedArticlesAmount] = React.useState(0);
    const [articlesToDisplay, setArticlesToDisplay] = React.useState(null);

    const displayCards = useCallback(() => {
        if (notDisplayedArticlesAmount > 3) {
            const articlesToShow = articles.splice(0, 3);
            setArticlesToDisplay(articlesToDisplay, ...articlesToShow);
            setNotDisplayedArticlesAmount(notDisplayedArticlesAmount - 3);
        }
        else if (notDisplayedArticlesAmount <= 3 && notDisplayedArticlesAmount !== 0) {
            setArticlesToDisplay(articles);
        }
      }, [articles, notDisplayedArticlesAmount, articlesToDisplay]);
      console.log(articles);
      console.log(articlesToDisplay);

    React.useEffect(() => {
        if (articles) {
            setNotDisplayedArticlesAmount(articles.length);
        }
        displayCards();
        console.log(notDisplayedArticlesAmount);
    }, []);

    return (articles ?
            <ul className="news-list">
                {/* isItSavedNews ?  */
                    articles.map((article) => 
                        <NewsCard  doesKeyWordNeedToBeShown={isSavedNewsOpen} 
                        actionButton={actButton} 
                        article={article} 
                        key={article.id}/>)
                }
            </ul>
            :
            ''
    );
}

export default NewsCardList;