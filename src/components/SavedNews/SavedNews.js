import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews({showAndHideNotFound, isUserLoggedIn, actionButton}) {
    return (
        <div className="saved-news">
            <NewsCardList toggleNotFound={showAndHideNotFound} 
                        isLoggedIn={isUserLoggedIn} actButton={actionButton} />
        </div>
    );
}

export default SavedNews;