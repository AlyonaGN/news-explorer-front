import React,  { useCallback } from 'react';
import { CONSTS } from '../../utils/consts.js';
import { formsValidator } from '../FormsValidator/FormsValidator.js';
import './PopupWithForm.css';

function PopupWithForm(props) {
    const [isRegister, setIsRegister] = React.useState(false);
    const [isButtonDisabled, setButtonDisabled] = React.useState(true);

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

    const [formValues, setFormValues] = React.useState({
        userEmail: "",
        userPassword: "",
        userName: ""
    });

    const [errors, setErrors] = React.useState({
        userEmailErrors: {
            required: false,
            minLength: false,
            maxLength: false,
        },
        userPasswordErrors: {
            required: false,
            minLength: false,
            maxLength: false,
        },
        userNameErrors: {
            required: false,
            minLength: false,
            maxLength: false,
        }
    });

    const handleEmailChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
        const userEmailValidationResult = formsValidator.validateEmailInput(value);
        if (!Object.values(userEmailValidationResult).includes(true)) {
            setButtonDisabled(false);
        }
        setErrors((prevState) => ({...prevState, 
            userEmailErrors: userEmailValidationResult,
        }));
    }, [setFormValues, setErrors]);

    const handlePasswordChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
        const userPasswordValidationResult = formsValidator.validatePasswordInput(value);
        if (!Object.values(userPasswordValidationResult).includes(true)) {
            setButtonDisabled(false);
        }
        setErrors((prevState) => ({...prevState, 
            userPasswordErrors: userPasswordValidationResult,
        }));
    }, [setFormValues, setErrors]);
    
    const handleNameChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
        const userNameValidationResult = formsValidator.validateNameInput(value);
        if (!Object.values(userNameValidationResult).includes(true)) {
            setButtonDisabled(false);
        }
        setErrors((prevState) => ({...prevState, 
            userNameErrors: userNameValidationResult,
        }));
    }, [setFormValues, setErrors]);

    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} onClick={props.onOverlayAndEscClick}>

            <form className="popup__form" name={isRegister ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE} >

                <button type="button" className="popup__close-button" onClick={props.onClose}></button>

                <h2 className="popup__header">{isRegister ? CONSTS.REGISTER_TITLE : CONSTS.LOGIN_TITLE}</h2>

                <label className="popup__input">Email
                    <input className="popup__field popup__field_email" value={formValues.userEmail} onChange={handleEmailChange} type="email" name="userEmail" placeholder="Введите почту" inputMode="email"/>
                    {errors.userEmailErrors.required && <span className="popup__field-error">Пожалуйста, заполните поле</span>}
                    {errors.userEmailErrors.minLength && <span className="popup__field-error">Минимальная длина email - 5 символов</span>}
                    {errors.userEmailErrors.maxLength && <span className="popup__field-error">Максимальная длина email - 20 символов</span>}
                </label>

                <label className="popup__input">Пароль
                    <input className="popup__field popup__field_password" value={formValues.userPassword} onChange={handlePasswordChange} type="text" name="userPassword" placeholder="Введите пароль" inputMode="search" />
                    {errors.userPasswordErrors.required && <span className="popup__field-error">Пожалуйста, заполните поле</span>}
                    {errors.userPasswordErrors.minLength && <span className="popup__field-error">Минимальная длина пароля - 5 символов</span>}
                    {errors.userPasswordErrors.maxLength && <span className="popup__field-error">Максимальная длина пароля - 20 символов</span>}
                </label>

                {
                    isRegister &&
                    <label className="popup__input">Имя
                        <input className="popup__field popup__field_name" value={formValues.userName} onChange={handleNameChange} type="text" name="userName" placeholder="Введите своё имя" inputMode="search" />
                        {errors.userNameErrors.required && <span className="popup__field-error">Пожалуйста, заполните поле</span>}
                        {errors.userNameErrors.minLength && <span className="popup__field-error">Минимальная длина имени - 2 символа</span>}
                        {errors.userNameErrors.maxLength && <span className="popup__field-error">Максимальная длина имени - 20 символов</span>}
                    </label>
                }

                <button type="button" onClick={isRegister ? props.onRegister : props.onLogin} className={isButtonDisabled ? "popup__submit-button popup__submit-button_inactive" : "popup__submit-button"} disabled={isButtonDisabled ? true : false}>{buttonName}</button>

                <span className="popup__alt-option">или <button className="popup__alt-option-button" type="button" onClick={handleAltOptionClick}>{altOptionText}</button></span>

            </form>

        </div>
    );
}

export default PopupWithForm;