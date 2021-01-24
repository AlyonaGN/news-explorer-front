import React, { useCallback } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import RenderCards from '../RenderCards/RenderCards.js';
import { useLocation } from "react-router-dom";
import { ROUTES_MAP } from '../../utils/routesMap';

function NewsCardList({ isLoggedIn, actButton, articles }) {
    const location = useLocation();
    const isSavedNewsOpen = (location.pathname === ROUTES_MAP.SAVED_NEWS);
    const [articlesAmount, setArticlesAmount] = React.useState(articles ? articles.length : 0);
    const [displayedArticles, setDisplayedArticles] = React.useState(null);

    const displayCards = useCallback(() => {
        if (articlesAmount > 3) {
            setDisplayedArticles(articles.splice(0, 3));
            displayedArticles.map((article) => {
                    setArticlesAmount(articlesAmount - 3);
                    return <NewsCard doesKeyWordNeedToBeShown={isSavedNewsOpen} 
                        actionButton={actButton} 
                        article={article} 
                        key={article.id} /> })
        }
        else {
            articles.map(article => <NewsCard  doesKeyWordNeedToBeShown={isSavedNewsOpen} 
                actionButton={actButton} 
                article={article} 
                key={article.id} />)
        }
      }, [actButton, articles, articlesAmount, displayedArticles, isSavedNewsOpen]);
      console.log(articles);

    return (articles ?
            <ul className="news-list">
                <RenderCards isItSavedNews={isSavedNewsOpen} />
            </ul>
            :
            ''
    );
}

export default NewsCardList;