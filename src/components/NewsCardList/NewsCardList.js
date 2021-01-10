import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList() {
    return (
        <>
            <h1 className="news-list__title">Результаты поиска</h1>
            <ul class="news-list">
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </ul>
            <button className="news-list__more-button" type="submit">Показать ещё</button>
        </>
    );
}

export default NewsCardList;