import React from 'react';
import './Main.css';
import About from '../About/About.js';
import Preloader from '../Preloader/Preloader.js';
import NotFound from '../NotFound/NotFound.js';
import SearchError from '../SearchError/SearchError.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main ({ searchResultsErr, 
                    isPreloaderShown, 
                    isNotFoundShown, 
                    actionButton, 
                    newsToDisplay,
                    displayNews,
                    isMoreButtonDisplayed }) {
    
    return (
        <main className="content-container">
            <section className={newsToDisplay.length !== 0 ? "content-container__results" : "content-container__results content-container__results_invisible"}>
                <h1 className="news-list__title">Результаты поиска</h1>
                {newsToDisplay.length !== 0 && <NewsCardList actButton={actionButton} 
                                                            articlesToDisplay={newsToDisplay}
                                                            displayCards={displayNews}
                                                            isMoreButtonNeeded={isMoreButtonDisplayed}/>}
            </section>
            <section className={isPreloaderShown ? "content-container__preloader" : "content-container__preloader content-container__preloader_invisible"}>
                <Preloader />
            </section>
            <section className={isNotFoundShown ? "content-container__error" : "content-container__error content-container__error_invisible"}>
                <NotFound />
            </section>
            <section className={searchResultsErr ? "content-container__error" : "content-container__error content-container__error_invisible"}>
                <SearchError />
            </section>
            <section className="content-container__about-author" >
                <About />
            </section> 
        </main>
    );
}

export default Main;