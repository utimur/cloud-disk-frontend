import React, {useState} from 'react';
import "./checkbox.css"

const Checkbox = (props) => {

    const {checked, setChecked} = props

    return (
        <div className="checkbox">
            <input onClick={()=>setChecked(!checked)} checked={checked} id="checkbox" type="checkbox"/>
            <label htmlFor="checkbox"><span></span>Запомнить меня?</label>
        </div>
    );
};

export default Checkbox;