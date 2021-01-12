import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews({showAndHidePreloader, showAndHideNotFound, isUserLoggedIn}) {
    return (
        <div className="saved-news">
            <NewsCardList togglePreloader={showAndHidePreloader} 
                        toggleNotFound={showAndHideNotFound} 
                        isLoggedIn={isUserLoggedIn} />
        </div>
    );
}

export default SavedNews;