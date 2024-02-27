import React, { useEffect } from 'react';
import { onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers';

export const TimeInput = ( { name, value, placeholder, onChangeFunction, label, errors, required = false, setErrors, checkErrors } ) => {
    let error = errors[name];

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, name, value, setErrors );
        }
    }, [ checkErrors, required, name, value, setErrors ])

    const onBlur = () => {
        onRequieredInput( required, name, value, setErrors );
        onRemoveInputError( error, name, setErrors, value );
    }
    

    return (
        <div className="inputContainer">
            {
                label && <label htmlFor={ name }>{ label }</label>
            }
            <input 
                name={ name }
                type="time" 
                placeholder={ placeholder }
                id={ name }
                value={ value }
                onChange={ onChangeFunction }
                className={ error ? 'error' : '' }
                onBlur={ onBlur }
                onKeyDown={ onBlur }
            />

            {error && <p className='errorInput'>{ error }</p>}
        </div>
    )
}
