import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews({showAndHideNotFound, actionButton, news}) {
    return (
        <div className="saved-news">
            <NewsCardList toggleNotFound={showAndHideNotFound} 
                        actButton={actionButton} 
                        articles={news} />
        </div>
    );
}

export default SavedNews;