import React from 'react';
import './SearchError.css';
import notFoundIcon from '../../images/not-found_v1.png';

function SearchError() {
    return (
        <div className="search-err">
            <img src={notFoundIcon} alt="здесь должна быть грустная иконка" className="search-err__img"></img>
            <p className="search-err__info">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
        </div>
    );
}

export default SearchError;