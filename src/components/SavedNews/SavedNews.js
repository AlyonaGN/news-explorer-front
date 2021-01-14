import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews({showAndHideNotFound, isUserLoggedIn}) {
    return (
        <div className="saved-news">
            <NewsCardList toggleNotFound={showAndHideNotFound} 
                        isLoggedIn={isUserLoggedIn} />
        </div>
    );
}

export default SavedNews;