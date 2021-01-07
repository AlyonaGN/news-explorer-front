import React from 'react';
import './SearchForm.css';

function SearchForm({  }) {
    return (
            <form className="search-form">
                <h1 className="search-form__title">Что творится в мире?</h1>
                <p>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <input placeholder="Введите тему новости" type="search"></input>
                <button type="submit"></button>
            </form> 
    );
}

export default SearchForm;