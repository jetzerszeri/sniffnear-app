import React, { useEffect } from 'react'
import { onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers';

export const SelectOptionInput = ( { name, value, onChangeFunction, label, errors, required = false, defaultOption = false,  setErrors, checkErrors, options = {} } ) => {

    let error = errors ? errors[name] : null;

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, name, value, setErrors );
        }
    }, [ checkErrors, value, required, name, setErrors ]);


    const onBlur = () => {
        if (required){
            onRequieredInput( required, name, value, setErrors );
            onRemoveInputError( error, name, setErrors, value );
        }
    }
    





    return (
    <div className="inputContainer">
            {label && <label htmlFor={ name }>{label}</label>}
            <select 
                name={ name }
                value={ value }
                onChange={ onChangeFunction }
                className={ error ? 'error' : '' }
                onBlur={  onBlur }
            >
                { 
                    defaultOption
                    ? <option value="" defaultValue>{ defaultOption }</option>
                    : <option value="" disabled defaultValue>Seleccioná una opción</option>
                }

                {
                    Object.keys(options).map( key => {
                        return <option key={ key } value={ key }>{ options[key] }</option>
                    })
                }
            </select>
            {error && <p className='errorInput'>{ error }</p>}
    </div>
    )
}
