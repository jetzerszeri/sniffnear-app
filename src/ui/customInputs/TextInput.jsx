import { useEffect } from "react";
import { onRemoveInputError } from "../../sniffNear/helpers";


export const TextInput = ( { name, value, placeholder, onChangeFunction, label, errors, required = false, setErrors, checkErrors } ) => {

    let error = errors[name];

    const onRequired = () => {
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
    }

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
    }, [checkErrors])

    

    return (
        <div className="inputContainer">
            {
                label && <label htmlFor={ name }>{ label }</label>
            }
            {/* <label htmlFor={ name }>{ label }</label> */}
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
