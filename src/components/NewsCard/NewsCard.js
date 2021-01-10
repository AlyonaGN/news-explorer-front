import React from 'react';
import './NewsCard.css';
import newsphoto from '../../images/news-photo.png';

function NewsCard() {
    return (
        <li><figure class="news-card">
            <button type="button" class="news-card__save-button"></button>
            <img class="news-card__photo" src={newsphoto} alt="здесь должно быть фото новости"></img>
            <figcaption class="news-card__caption">
                <p class="news-card__date">2 августа, 2019</p>
                <h2 class="news-card__title">Национальное достояние – парки</h2>
                <p class="news-card__abstract">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – 
                    охраняемых территорий, где и сегодня каждый может приобщиться к природе.
                </p>
                <p class="news-card__source">Лента.ру</p>
            </figcaption>
        </figure>
        </li>
    );
}

export default NewsCard;

