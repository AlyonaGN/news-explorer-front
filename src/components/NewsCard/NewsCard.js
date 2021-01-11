import React from 'react';
import './NewsCard.css';
import newsphoto from '../../images/news-photo.png';

function NewsCard({showAndHidePreloader, isUserLoggedIn}) {
    return (
        <li><figure className="news-card" onClick={showAndHidePreloader}>
            <button type="button" className={isUserLoggedIn ? "news-card__save-button" : "news-card__save-button"} disabled={isUserLoggedIn ? false : true}></button>
            <img className="news-card__photo" src={newsphoto} alt="здесь должно быть фото новости"></img>
            <figcaption className="news-card__caption">
                <p className="news-card__date">2 августа, 2019</p>
                <h2 className="news-card__title">Национальное достояние – парки</h2>
                <p className="news-card__abstract">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – 
                    охраняемых территорий, где и сегодня каждый может приобщиться к природе.
                </p>
                <p className="news-card__source">Лента.ру</p>
            </figcaption>
        </figure>
        </li>
    );
}

export default NewsCard;

