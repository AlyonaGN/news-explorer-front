import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
            <form className="search-form">
                <h1 className="search-form__title">Что творится в мире?</h1>
                <p className="search-form__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <div className="search-form__search-line">
                    <input className="search-form__input" placeholder="Введите тему новости" type="text"></input>
                    <button className="search-form__submit-button" type="submit">Искать</button>
                </div>
            </form> 
    );
}

export default SearchForm;