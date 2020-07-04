import React, {useState} from 'react';
import "./checkbox.css"

const Checkbox = (props) => {

    const {checked, setChecked} = props

    function onCheckClick(e) {
        e.stopPropagation()
        setChecked(!checked)
    }

    return (
        <div className="checkbox">
            <input onClick={(e)=> onCheckClick(e)} checked={checked} id="checkbox" type="checkbox"/>
            <label htmlFor="checkbox"><span></span>{props.text}</label>
        </div>
    );
};

export default Checkbox;