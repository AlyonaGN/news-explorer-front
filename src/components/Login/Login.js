import React, { useCallback } from 'react';
import { CONSTS } from '../../utils/auth-consts.js';
import { ERRORS } from '../../utils/errors.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function Login({ onLogin, isPopupOpen, handleOverlayClick, onCloseClick, onRegisterClick }) {
    const [formValues, setFormValues] = React.useState({
        userEmail: "",
        userPassword: "",
    });
    const [errors, setErrors] = React.useState({
        userEmail: [],
        userPassword: [],
    });
    const [isValid, setIsValid] = React.useState(false);

    const setInputErrors = useCallback((eventTarget, eventName) => {
        let errorMessages = [];
        if (eventTarget.validity.valueMissing){
            errorMessages.push(ERRORS.REQUIRED_INPUT);
        }
        else if (eventTarget.validity.tooShort){
            errorMessages.push(ERRORS.TOO_SHORT);
        }
        
        if (eventTarget.validity.tooLong){
            errorMessages.push(ERRORS.TOO_LONG);
        }
        if (eventTarget.validity.typeMismatch){
            errorMessages.push(ERRORS.NOT_EMAIL);
        } 
        setErrors({...errors, [eventName]: errorMessages });
    }, [errors]);

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setFormValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
        },
        [setFormValues, setErrors, setIsValid]
    );

    const handleInputChange = useCallback((event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFormValues({...formValues, [name]: value});
        setInputErrors(target, name);
        setIsValid(target.closest("form").checkValidity());
    }, [formValues, setInputErrors]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        onLogin(formValues.password, formValues.email);
        resetForm();
    }, [formValues, onLogin, resetForm]);

    return (
        <PopupWithForm isFormValid={isValid} 
                        onSubmit={handleSubmit} 
                        isOpen={isPopupOpen} 
                        onOverlayAndEscClick={handleOverlayClick} 
                        onClose={onCloseClick}
                        onAltOptionClick={onRegisterClick}
                        title={CONSTS.LOGIN_TITLE}
                        buttonName={CONSTS.LOGIN_INVITE}
                        altOptionText={CONSTS.REGISTER_INVITE}>
                <label className="popup__input">Email
                    <input className="popup__field popup__field_email" 
                            required
                            maxLength="35" 
                            value={formValues.userEmail} 
                            onChange={handleInputChange} 
                            type="email" 
                            name="userEmail" 
                            placeholder="Введите почту" 
                            inputMode="email"/>
                    {errors.userEmail.length > 0 && <span className="popup__field-error">{errors.userEmail}</span>}
                </label>

                <label className="popup__input">Пароль
                    <input className="popup__field popup__field_password"
                            required
                            minLength="5"
                            maxLength="15" 
                            value={formValues.userPassword} 
                            onChange={handleInputChange} 
                            type="text" 
                            name="userPassword" 
                            placeholder="Введите пароль" 
                            inputMode="search" />
                    {errors.userPassword.length > 0 && <span className="popup__field-error">{errors.userPassword}</span>}
                </label>

        </PopupWithForm>    
    );

}

export default Login;