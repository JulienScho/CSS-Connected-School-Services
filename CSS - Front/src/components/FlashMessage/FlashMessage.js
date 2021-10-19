import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import './style.scss'


const FlashMessage = ({ incomingMessage }) => {

    const [message, setMessage] = useState(incomingMessage);
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("");
            dispatch({
                type: 'RESET_FLASH_MESSAGES',
            })

        }, 2800); 
        /*const timer =() => {
            setMessage("");
            dispatch({
                type: 'RESET_FLASH_MESSAGES',
            })

        };*/
        return () => clearTimeout(timer);
    })

    return (
        <div className="flashMessage">
            <p className="flashMessage__text">{message}</p>
        </div>
    );
}

export default FlashMessage;