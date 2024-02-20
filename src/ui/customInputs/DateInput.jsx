import { useEffect } from 'react';
import { getCurrentDate, onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers/';

export const DateInput = ( { name, value, label, onChangeFunction, required = false, errors, checkErrors, setErrors, max = false } ) => {

    const error = errors[name];

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, name, value, setErrors );
        }
    }, [ checkErrors ])


    const onBlur = () => {
        onRequieredInput( required, name, value, setErrors );
        onRemoveInputError( error, name, setErrors, value );
    }

    const setMaxDate = () => {
        if (max){
            return getCurrentDate();
        }
    }



    return (
        <div className="inputContainer">
            <label htmlFor={ name }>{ label }</label>
            <input
            name={ name }
            type="date"
            id={ name }
            value={ value }
            onChange={ onChangeFunction }
            onBlur={  onBlur }
            onKeyDown={ onBlur }
            className={ error ? 'error' : '' }
            max={ setMaxDate() }
            />
            {error && <p className='errorInput'>{ error }</p>}
        </div>
    )
}
