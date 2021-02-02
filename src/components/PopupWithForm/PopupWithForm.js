import React,  { useCallback } from 'react';
import { CONSTS } from '../../utils/auth-consts.js';
import './PopupWithForm.css';

function PopupWithForm(props) {
    const [isRegister, setIsRegister] = React.useState(props.isRegister);

    let buttonName;
    let altOptionText;

    if (!isRegister) {
        buttonName = CONSTS.LOGIN_INVITE;
        altOptionText = CONSTS.REGISTER_INVITE;
    }
    else if (isRegister) {
        buttonName = CONSTS.REGISTER_INVITE;
        altOptionText = CONSTS.LOGIN_INVITE;
    }

    const handleAltOptionClick = useCallback((e) => {
        setIsRegister(!isRegister);
    }, [isRegister]);

    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} onClick={props.onOverlayAndEscClick}>

            <form className="popup__form" name={isRegister ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE} onSubmit={props.onSubmit} >

                <button type="button" className="popup__close-button" onClick={props.onClose}></button>

                <h2 className="popup__header">{isRegister ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE}</h2>

                {props.children}

                <button type="submit" 
                        className={props.isFormValid ? "popup__submit-button" : "popup__submit-button popup__submit-button_inactive"} 
                        disabled={props.isFormValid ? false : true}>{buttonName}</button>

                <span className="popup__alt-option">или <button className="popup__alt-option-button" type="button" onClick={handleAltOptionClick}>{altOptionText}</button></span>

            </form>

        </div>
    );
}

export default PopupWithForm;