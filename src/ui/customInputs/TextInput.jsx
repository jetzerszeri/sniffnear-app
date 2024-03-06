import { useCallback, useEffect } from "react";
import { onRemoveInputError } from "../../sniffNear/helpers";


export const TextInput = ( { name, value, placeholder, onChangeFunction, label, errors, required = false, setErrors, checkErrors } ) => {

    let error = errors[name];

    const onRequired = useCallback(() => {
        if (required && value.trim().length === 0){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: '*Campo obligatorio'
                }
            })
        } else {
            onRemoveInputError( error, name, setErrors, value );
        }
    }, [ required, value, name, setErrors, error ]);

    const onInputChange = () => {

        if (error){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
        
    }

    useEffect(() => {
        if (checkErrors){
            onRequired();
        }
    }, [ checkErrors, onRequired ])

    

    return (
        <div className="inputContainer">
            <div>
                { label && <label htmlFor={ name }>{ label }</label>}
                { !required && <p>Si tiene collar o sabes su nombre por favor agregalo.</p>}
            </div>
            <input
            name={ name }
            type="text"
            placeholder={ placeholder }
            id={ name }
            value={ value }
            onChange={ onChangeFunction }
            onBlur={  onRequired }
            onKeyDown={ onInputChange }
            className={ error ? 'error' : '' }
            />
            {error && <p className='errorInput'>{ error }</p>}
        </div>
    )
}
