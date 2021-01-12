import React from 'react';
import './Main.css';
import About from '../About/About.js';
import Preloader from '../Preloader/Preloader.js';
import NotFound from '../NotFound/NotFound.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main ({areResultsShown, isPreloaderShown, showAndHidePreloader, showAndHideNotFound, isNotFoundShown, isUserLoggedIn}) {
    return (
        <main className="content-container">
            <section className={areResultsShown ? "content-container__results" : "content-container__results content-container__results_invisible"}>
                <h1 className="news-list__title">Результаты поиска</h1>
                <NewsCardList togglePreloader={showAndHidePreloader} toggleNotFound={showAndHideNotFound} isLoggedIn={isUserLoggedIn}/>
                <button className="news-list__more-button" type="button" onClick={showAndHideNotFound}>Показать ещё</button>
            </section>
            <section className={isPreloaderShown ? "content-container__preloader" : "content-container__preloader content-container__preloader_invisible"}>
                <Preloader />
            </section>
            <section className={isNotFoundShown ? "content-container__not-found" : "content-container__not-found content-container__not-found_invisible"}>
                <NotFound />
            </section>
            <section className="content-container__about-author">
                <About />
            </section> 
        </main>
    );
}

export default Main;