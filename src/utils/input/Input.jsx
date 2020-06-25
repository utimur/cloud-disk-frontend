import React from 'react';
import "./input.css"
const Input = (props) => {

    return (
        <input onChange={(event)=>props.setValue(event.target.value)} value={props.value} ref={props.reference} className="input-text" type={props.type} placeholder={props.placeholder}/>
    );
};

export default Input;