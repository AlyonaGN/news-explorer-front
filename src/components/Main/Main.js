import React from 'react';
import './Main.css';
import About from '../About/About.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main ({areResultsShown}) {
    return (
        <main className="content-container">
            <section className="content-container__about-author">
                <About />
            </section>
            <section className={areResultsShown ? "content-container__results" : "content-container__results content-container__results_invisible"}>
                <NewsCardList />
            </section>
        </main>
    );
}

export default Main;