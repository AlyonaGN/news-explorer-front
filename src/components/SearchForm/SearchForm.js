import React, { useCallback } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, showAndHidePreloader }) {
    const [searchValue, setSearchValue] = React.useState({
        value: ""
    });

    const checkValidity = useCallback((inputValue) => {
        if (inputValue.validity.valueMissing) {
            showInputError(inputValue, formInput.validationMessage);
        } 
        else {
            hideInputError(formInput);
        }
    })

    const handleChange = useCallback((e) => {
        setSearchValue({ value: e.target.value });
        checkValidity(e.target);
      }, []);

    return (
            <form className="search-form" onSubmit={onSearch} noValidate>
                <h1 className="search-form__title">Что творится в мире?</h1>
                <p className="search-form__subtitle" onClick={showAndHidePreloader}>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <div className="search-form__search-line">
                    <input className="search-form__input" placeholder="Введите тему новости" type="text" onChange={handleChange} value={searchValue.value} required></input>
                    {!isValid && <span class="search-form__input-error">Необходимо заполнить данное поле</span>}
                    <button className="search-form__submit-button" type="submit" disabled={isValid ? false : true}>Искать</button>
                </div>
            </form> 
    );
}

export default SearchForm;