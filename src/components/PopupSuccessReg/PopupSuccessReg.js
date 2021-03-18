import { CONSTS } from '../../utils/auth-consts';
import './PopupSuccessReg.css';

function PopupSuccessReg(props) {

    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} onClick={props.onOverlayAndEscClick} >

            <div className="popup__window" >

                <button type="button" className="popup__close-button" onClick={props.onClose}></button>

                <h2 className="popup__header">Пользователь успешно зарегистрирован!</h2>
                <button className="popup__alt-option-button" type="button" onClick={props.onLogin}>{CONSTS.LOGIN_INVITE}</button>

            </div>

        </div>
    );
}

export default PopupSuccessReg;