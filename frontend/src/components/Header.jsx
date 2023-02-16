import React, { useState } from "react";
import { Link } from "react-router-dom"
import logo from '../images/logo.svg';
import line from '../images/line.png';

function Header({ linkTitle, link, email, loggedIn, onSingOut }) {

    const [isButtonMenu, setIsButtonMenu] = useState(false); //clicked, setClicked

    const handleMenuClick = () => setIsButtonMenu(state => !state);

    return (
        <header className="header">
            <div className={`header__menu ${loggedIn && "header__menu_type_loggedIn"} ${isButtonMenu && "header__menu_active"}`}>
                <span className="header__email">{email}</span>
                <Link
                    to={link}
                    className="link header__link"
                    onClick={onSingOut}
                >
                    {linkTitle}
                </Link>
            </div>
            <div className="header__flexbox">
                <img className="header__logo" src={logo} alt="Места России" />
                <div className={`header__flex ${loggedIn && "header__flex_type_loggedIn"}`}>
                    <span className="header__email">{email}</span>
                    <Link
                        to={link}
                        className="link header__link"
                        onClick={onSingOut}
                    >
                        {linkTitle}
                    </Link>
                </div>
                <button
                    type="button"
                    className={`header__button ${loggedIn && "header__button_type_loggedIn"} ${isButtonMenu && "header__button_opened"}`}
                    onClick={handleMenuClick}
                >
                    <img className="header__line" src={line} alt="Линия" />
                    <img className="header__line" src={line} alt="Линия" />
                    <img className="header__line" src={line} alt="Линия" />
                </button>
            </div>
        </header>
    );
}

export default Header;