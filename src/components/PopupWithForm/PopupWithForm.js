import React,  { useCallback } from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {
    const { isFormValid, 
            onSubmit, 
            isOpen, 
            onOverlayAndEscClick, 
            onClose,
            onAltOptionClick, 
            title, 
            buttonName, 
            altOptionText, 
            children } = props;

    const handleAltOptionClick = useCallback(() => {
        onAltOptionClick();
    }, [onAltOptionClick]);

    return (
        <div className={`popup ${isOpen && `popup_opened`}`} onClick={onOverlayAndEscClick}>

            <form className="popup__form" name={title} onSubmit={onSubmit} >

                <button type="button" className="popup__close-button" onClick={onClose}></button>

                <h2 className="popup__header">{title}</h2>

                {children}

                <button type="submit" 
                        className={isFormValid ? "popup__submit-button" : "popup__submit-button popup__submit-button_inactive"} 
                        disabled={isFormValid ? false : true}>{buttonName}</button>

                <span className="popup__alt-option">или <button className="popup__alt-option-button" type="button" onClick={handleAltOptionClick}>{altOptionText}</button></span>

            </form>

        </div>
    );
}

export default PopupWithForm;