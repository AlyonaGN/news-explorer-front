import React, { useCallback } from 'react';
import './SearchForm.css';
import { ERRORS } from '../../utils/errors.js';

function SearchForm({ receiveResults }) {
    const [searchValue, setSearchValue] = React.useState({
        value: ""
    });
    const [isValid, setValid] = React.useState(false);
    const [isErrorDisplayed, setErrorDisplayed] = React.useState(false);

    const checkValidity = useCallback((inputValue) => {
        if (inputValue.validity.valueMissing) {
            setErrorDisplayed(true);
        } 
        else {
            setValid(true);
            setErrorDisplayed(false);
        }
    }, []);

    const handleChange = useCallback((e) => {
        setSearchValue({ value: e.target.value });
        checkValidity(e.target);
      }, [checkValidity]);

      const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const today = new Date().toISOString();
        const sevenDaysEarlier = new Date((Date.now() - 604800000)).toISOString();
        receiveResults(searchValue.value, sevenDaysEarlier, today);
        setSearchValue({ value: "" })
      }, [searchValue, receiveResults]);

    return (
            <form className="search-form" onSubmit={handleSubmit} noValidate>
                <h1 className="search-form__title">Что творится в мире?</h1>
                <p className="search-form__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <div className="search-form__search-line">
                    <input className="search-form__input" placeholder="Введите тему новости" type="text" onChange={handleChange} value={searchValue.value} required></input>
                    {isErrorDisplayed && <span className="search-form__input-error">{ERRORS.REQUIRED_INPUT}</span>}
                    <button className="search-form__submit-button" type="submit" disabled={isValid ? false : true}>Искать</button>
                </div>
            </form> 
    );
}

export default SearchForm;