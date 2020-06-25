import React from 'react';
import "./input.css"
const Input = (props) => {
    return (
        <input className="input-text" type={props.type} placeholder={props.placeholder}/>
    );
};

export default Input;