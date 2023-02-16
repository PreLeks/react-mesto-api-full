import React, { useRef } from "react";
import { Link } from "react-router-dom";
import LabelSet from "./LabelSet";
import useFormValidation from "../utils/useFormValidation";

const SignUp = ({ title, btnText, isLogin, onSubmit }) => {

    const userEmailRef = useRef();
    const userPasswordRef = useRef();
    const { handleUpperInputChange, handleLowerInputChange, isButtonValid } = useFormValidation(userEmailRef, userPasswordRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            email: userEmailRef.current.value,
            password: userPasswordRef.current.value
        })
    }

    return (
        <div className="sign-up__box">
            <h2 className="popup__form-title">{title}</h2>
            <form className="popup__form-page" name="sign-in" onSubmit={handleSubmit}>
                <LabelSet
                    inputType="email"
                    inputClassType="registration"
                    placeholder="Email"
                    id="input-email"
                    minLength="2"
                    maxLength="40"
                    inputRef={userEmailRef}
                    onChange={handleUpperInputChange}
                />
                <LabelSet
                    inputType="password"
                    inputClassType="registration"
                    placeholder="Пароль"
                    id="input-password"
                    minLength="8"
                    maxLength="50"
                    inputRef={userPasswordRef}
                    onChange={handleLowerInputChange}
                />
                <button
                    className={`popup__button popup__button_type_auth ${!isButtonValid && "popup__button_disabled"}`}
                    value={btnText}
                    id="button-save"
                    disabled={!isButtonValid}
                >
                    {btnText}
                </button>
                {!isLogin && <p className="sign-up__title">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
            </form>
        </div>
    )
}

export default SignUp;