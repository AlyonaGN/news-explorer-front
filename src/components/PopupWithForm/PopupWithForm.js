import React,  { useCallback } from 'react';
import { CONSTS } from '../../utils/auth-consts.js';
import './PopupWithForm.css';

function PopupWithForm(props) {
    const { isFormValid, onSubmit, isOpen, onOverlayAndEscClick, onClose, isRegister, onAltOptionClick, children } = props;
    const [isRegisterPopup, setIsRegisterPopup] = React.useState(isRegister);

    let buttonName;
    let altOptionText;

    if (!isRegisterPopup) {
        buttonName = CONSTS.LOGIN_INVITE;
        altOptionText = CONSTS.REGISTER_INVITE;
    }
    else if (isRegisterPopup) {
        buttonName = CONSTS.REGISTER_INVITE;
        altOptionText = CONSTS.LOGIN_INVITE;
    }

    const handleAltOptionClick = useCallback(() => {
        onAltOptionClick();
        console.log(children);
        setIsRegisterPopup(!isRegisterPopup);
    }, [isRegisterPopup, onAltOptionClick]);

    return (
        <div className={`popup ${isOpen && `popup_opened`}`} onClick={onOverlayAndEscClick}>

            <form className="popup__form" name={isRegisterPopup ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE} onSubmit={onSubmit} >

                <button type="button" className="popup__close-button" onClick={onClose}></button>

                <h2 className="popup__header">{isRegisterPopup ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE}</h2>

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