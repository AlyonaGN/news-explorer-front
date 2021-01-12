import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
    return (
            <div className="saved-news-header">
                <h1 className="saved-news-header__title">Сохранённые статьи</h1>
                <p className="saved-news-header__amount-of-articles">Грета, у вас 5 сохранённых статей</p>
                <p className="saved-news-header__key-words">По ключевым словам: <b>Природа</b>, <b>Тайга</b> и <b>2-м другим</b></p>
            </div> 
    );
}

export default SavedNewsHeader;