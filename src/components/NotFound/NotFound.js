import React from 'react';
import './NotFound.css';
import notFoundIcon from '../../images/not-found_v1.png';

function NotFound() {
    return (
        <div className="not-found">
            <img src={notFoundIcon} alt="здесь должна быть грустная иконка" className="not-found__img"></img>
            <h3 className="not-found__title">Ничего не найдено</h3>
            <p className="not-found__info">К сожалению по вашему запросу ничего не найдено.</p>
        </div>
    );
}

export default NotFound;