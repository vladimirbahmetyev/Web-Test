import React  from 'react';
import "./Input.css"

export default function Input(props) {
    const {name, inputName, onChange, type, value} = props
    return(
        <div className="input">
            <label className="input__label">
                <div className="input__text">{inputName}</div>
                <input 
                    value={value}
                    type={type || 'text'}
                    name={name}
                    className="input__pure-input"
                    onChange={e => onChange(e.target.value)}
                    />                
            </label>
        </div>
    )    
}