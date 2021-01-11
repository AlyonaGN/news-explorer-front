import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
        <>
            <i className="preloader"></i>
            <p className="preloader__info">Идет поиск новостей...</p>
        </>
    );
}

export default Preloader;