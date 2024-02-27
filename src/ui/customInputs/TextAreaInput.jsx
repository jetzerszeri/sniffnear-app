import { useEffect } from 'react';
import { onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers';

export const TextAreaInput = ( { name, value, placeholder, onChangeFunction, label, errors, required = false, setErrors, checkErrors }) => {

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

        <textarea
            name={ name }
            placeholder={ placeholder }
            id={ name }
            value={ value }
            onChange={ onChangeFunction }
            onBlur={  onBlur }
            onKeyDown={ onBlur }
            className={ error ? 'error' : '' }
            rows="5"
        />

        {error && <p className='errorInput'>{ error }</p>}
    </div>
    )
}
