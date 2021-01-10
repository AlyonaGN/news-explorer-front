import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import { ROUTES_MAP } from '../../utils/routesMap';
import gitlogo from '../../images/github.png';
import fblogo from '../../images/fb.png';
import { EXTERNAL_LINK } from '../../utils/externalLinks';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2021.AlyonaGN, Powered by News API</p>
            <div className="footer__links">
                <nav class="footer__menu-links">
                    <NavLink className="footer__menu-link" to={ROUTES_MAP.MAIN}>Главная</NavLink>
                    <a className="footer__menu-link" href={EXTERNAL_LINK.PRAKTIKUM}>Яндекс.Практикум</a>
                </nav>
                <ul class="footer__networks-links">
                    <li class="footer__networks-link"><a href={EXTERNAL_LINK.GITHUB}>
                        <img class="footer__networks-icon" src={gitlogo} alt="здесь должна быть иконка гитхаба, но что-то пошло не так" />
                    </a></li>
                    <li class="footer__networks-link"><a href={EXTERNAL_LINK.FACEBOOK}>
                        <img class="footer__networks-icon" src={fblogo} alt="здесь должна быть иконка фэйсбука, но что-то пошло не так" />
                    </a></li>
                </ul>
            </div>
        </footer>

    );
}

export default Footer;