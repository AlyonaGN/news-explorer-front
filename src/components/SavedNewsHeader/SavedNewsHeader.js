import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ name, amountOfArticles, keyWordsAndRepetitions }) {
    let savedNewsText;
    let keyWordsToDisplay;
    const keyWords = Object.keys(keyWordsAndRepetitions);

    switch (keyWords.length) {
        case 1:
            keyWordsToDisplay = keyWords[0];
            break;
        case 2:
            keyWordsToDisplay = `${keyWords[0]} и ${keyWords[1]}`;
            break;
        case 3:
            keyWordsToDisplay = `${keyWords[0]}, ${keyWords[1]} и ${keyWords[2]}`;
            break;
        default:
            const sortedKeys = Object.keys(keyWordsAndRepetitions).sort((a,b) => keyWordsAndRepetitions[b] - keyWordsAndRepetitions[a]);
            keyWordsToDisplay = `${sortedKeys[0]}, ${sortedKeys[1]} и ${sortedKeys.length - 2} другим`;
    }

    switch (amountOfArticles) {
        case 1:
        case amountOfArticles % 10 === 1:
            savedNewsText = "сохранённая статья";
            break;
        case 2:
        case 3:
        case 4:
        case amountOfArticles % 10 === 2 || 3 || 4:
            savedNewsText = "сохранённые статьи";
            break;
        default:
            savedNewsText = "сохранённых статей";
    }

    return (
        <div className="saved-news-header">
            <h1 className="saved-news-header__title">Сохранённые статьи</h1>
            <p className="saved-news-header__amount-of-articles">{name}, у вас {amountOfArticles} {savedNewsText}</p>
            {amountOfArticles > 0 && <p className="saved-news-header__key-words">По ключевым словам: <b>{keyWordsToDisplay}</b></p>}
        </div>
    );
}

export default SavedNewsHeader;