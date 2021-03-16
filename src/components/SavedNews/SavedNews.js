import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import AppHeader from '../AppHeader/AppHeader.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';

function SavedNews({ isUserLoggedIn,
    onMenu,
    isMenuOpened,
    onAuth,
    closeMenuByClick,
    signOut,
    userName,
    amountofSavedNews,
    newsToDisplay,
    displayNews,
    isMoreButtonNeedToBeSwown,
    savedNews,
    onSave,
    onUnsave }) {

    const [savedNewsToDisplay, setSavedNewsToDisplay] = React.useState(newsToDisplay);
    const keyWords = {};
    savedNews.forEach((news) => {
        keyWords[news.keyword] ? ++keyWords[news.keyword] : keyWords[news.keyword] = 1;
    })

    React.useEffect(() => {
        setSavedNewsToDisplay(newsToDisplay);
        console.log(keyWords);
    }, [newsToDisplay, savedNews, keyWords]);

    return (
        <>
        <div className="page__header_saved-news">
        <AppHeader onMenuClick={onMenu} 
                    isMenuShown={isMenuOpened}
                    isLoggedIn={isUserLoggedIn} 
                    isFontDark={true}
                    onAuthClick={onAuth}
                    closeMenuOnclick={closeMenuByClick}
                    onSignOut={signOut}
                    name={userName}
                    onSavedNewsClick={onSave} 
        />
        <SavedNewsHeader name={userName}
                          amountOfArticles={amountofSavedNews}
                          keyWordsAndRepetitions={keyWords}/>
        </div>
        <div className="saved-news">
            <NewsCardList articlesToDisplay={savedNewsToDisplay}
                            displayCards={displayNews} 
                            isMoreButtonNeeded={isMoreButtonNeedToBeSwown} 
                            savedArticles={[]} 
                            isLoggedIn={isUserLoggedIn} 
                            handleSaveClick={onSave} 
                            handleUnsaveClick={onUnsave}
                            />
        </div>
        </>
    );
}

export default SavedNews;