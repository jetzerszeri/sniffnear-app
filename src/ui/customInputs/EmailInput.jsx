import { useCallback, useEffect } from "react";


export const EmailInput = ( { name = 'email', value, onChangeFunction, errors, required = false, setErrors, checkErrors } ) => {

    let error = errors[name];

    const onRequired = useCallback(() => {
        if (required && value.trim().length === 0){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: '*Campo obligatorio'
                }
            })
        } else if (!/^\S+@\S+\.\S+$/.test( value )){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: '*El email ingresado es inválido'
                }
            })
        }
    }, [ required, value, name, setErrors ]);

    const onInputChange = () => {

        if (error || /^\S+@\S+\.\S+$/.test( value )){
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
            <label htmlFor={ name }>Email</label>
            <input
            name={ name }
            placeholder="ejemplo@mail.com"
            id={ name }
            value={ value }
            onChange={ onChangeFunction }
            onBlur={  onRequired }
            onKeyDown={ onInputChange }
            className={ error ? 'error' : '' }
            />
            {error && <p className='errorInput'>{error}</p>}
        </div>
    )
}
