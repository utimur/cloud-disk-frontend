import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {activation, auth} from "../../../actions/user";
import {store} from "../../../reducers";

const ActivationForm = (props) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(activation(props.match.params.token))
        props.history.push("/")
        }
    )

    return (
        <div>
        </div>
    );
};


export default ActivationForm;