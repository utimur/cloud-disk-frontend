import React from 'react';
import "./button.css";

const Button = (props) => {
    return (
        <button className="button">{props.text}</button>
    );
};

export default Button;