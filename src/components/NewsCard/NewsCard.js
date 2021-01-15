import React, {useCallback} from 'react';
import './NewsCard.css';
import newsphoto from '../../images/news-photo.png';

function NewsCard({ isItSavedNewsPage, actionButton }) {
    
    return (
        <li><figure className="news-card">
            {actionButton}
            <p className={isItSavedNewsPage ? "news-card__key-word news-card__key-word_visible" : "news-card__key-word"}>Природа</p>
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

