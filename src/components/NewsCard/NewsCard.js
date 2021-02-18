import React from 'react';
import './NewsCard.css';

function NewsCard({ doesKeyWordNeedToBeShown,
    actionButton,
    picture,
    date,
    title,
    summary,
    source,
    keyWord,
    url }) {

    return (
        <li data-url={url}><figure className="news-card">
            {actionButton}
            <p className={doesKeyWordNeedToBeShown ? "news-card__key-word news-card__key-word_visible" : "news-card__key-word"}>{keyWord}</p>
            <img className="news-card__photo" src={picture} alt="здесь должно быть фото новости"></img>
            <figcaption className="news-card__caption">
                <p className="news-card__date">{date}</p>
                <h2 className="news-card__title">{title}</h2>
                <p className="news-card__abstract">{summary}</p>
                <p className="news-card__source">{source}</p>
            </figcaption>
        </figure>
        </li>
    );
}

export default NewsCard;

