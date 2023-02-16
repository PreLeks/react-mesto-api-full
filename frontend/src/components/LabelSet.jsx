import React, { useState, useEffect } from "react";

function LabelSet({
    inputType,
    inputClassType,
    placeholder,
    id,
    minLength,
    maxLength,
    value,
    onChange,
    inputRef,
    isOpen
}) {

    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(true);
    }, [isOpen]);

    const handleErrorMessage = (e) => {
        if (!e.target.validity.valid) {
            setIsValid(false);
            setErrorMessage(e.target.validationMessage);
        } else {
            setIsValid(true);
            setErrorMessage('');
        }
        onChange(e);
    }

    return (
        <label className="popup__field">
            <input
                type={inputType}
                className={`popup__input popup__input_type_${inputClassType} ${!isValid && "popup__input_type_error"}`}
                placeholder={placeholder}
                id={id}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={handleErrorMessage}
                ref={inputRef}
                required
            />
            <span className={`popup__error ${id}-error ${!isValid && "popup__error_visible"}`}>
                {errorMessage}
            </span>
        </label>
    )
}

export default LabelSet;