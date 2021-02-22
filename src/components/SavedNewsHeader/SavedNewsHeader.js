import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ name, amountofSavedNews }) {
    let savedNewsText;
    switch(amountofSavedNews) {
        case 1:
        case amountofSavedNews % 10 === 1:
            savedNewsText = "сохранённая статья";  
            break;
        case 2:
        case 3:
        case 4:
        case amountofSavedNews % 10 === 2 || 3 || 4:  
            savedNewsText = "сохранённые статьи";  
            break;
        default:
            savedNewsText = "сохранённых статей";  
        }

    return (
            <div className="saved-news-header">
                <h1 className="saved-news-header__title">Сохранённые статьи</h1>
                <p className="saved-news-header__amount-of-articles">{name}, у вас {amountofSavedNews} {savedNewsText}</p>
                <p className="saved-news-header__key-words">По ключевым словам: <b>Природа</b>, <b>Тайга</b> и <b>2-м другим</b></p>
            </div> 
    );
}

export default SavedNewsHeader;