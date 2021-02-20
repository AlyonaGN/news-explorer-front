import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews({ newsToDisplay, displayNews, isMoreButtonNeedToBeSwown, savedNews, isUserLoggedIn, onSave, onUnsave }) {
    console.log(savedNews);
    return (
        <div className="saved-news">
            <NewsCardList articlesToDisplay={newsToDisplay}
                            displayCards={displayNews} 
                            isMoreButtonNeeded={isMoreButtonNeedToBeSwown} 
                            savedArticles={[]} 
                            isLoggedIn={isUserLoggedIn} 
                            handleSaveClick={onSave} 
                            handleUnsaveClick={onUnsave}
                            />
        </div>
    );
}

export default SavedNews;