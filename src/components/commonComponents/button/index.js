import React from "react";
import './style.css';

function Button({text,onClick,disabled}){
    return (
        <button className="custom-btn" onClick={onClick} disabled={disabled}>{text}</button>
    )
}
export default Button;