import { useEffect, useState } from "react"


export const PasswordInput = ( { name = "password", value, onChangeFunction, errors, required = false, setErrors, confirm = false, confirmValue, confirmName ="validatePassword", checkErrors} ) => {

    const [showPassword, setShowPassword] = useState( false );
    let error = errors[name];
    let validateError = errors[confirmName];


    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const onRequired = () => {
        if (required && value.trim().length === 0){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: '*Campo obligatorio'
                }
            })
        } else if (value.trim().length < 6){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: '*La contraseña debe tener al menos 6 caracteres'
                }
            })
        }
    }

    const onValidate = () => {
        if (confirm && value !== confirmValue){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [confirmName]: '*Las contraseñas no coinciden',
                }
            })
        } else if ( confirmValue === '' ){
            setErrors( (prevErrors) => {
                return {
                    ...prevErrors,
                    [confirmName]: '*Campo obligatorio'
                }
            })
        }
    }

    const onInputChange = () => {
        if ( error ){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    }

    const onValidateChange = () => {
        if (validateError || value === confirmValue){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[confirmName];
                return updatedErrors;
            });
        } 
    }

    useEffect(() => {
        if (checkErrors){
            onRequired();
            if (confirm){ onValidate();}
        }
    }, [checkErrors])


    return (
    <>
            <div className="inputContainer">
                <label htmlFor={ name }>Contraseña</label>
                <div className="pswdInput">
                    <input
                    type={ showPassword ? 'text' : 'password'}
                    name={ name }
                    placeholder="Ingresá tu contraseña"
                    id={ name }
                    value={ value }
                    onChange={ onChangeFunction }
                    onBlur={  onRequired }
                    onKeyDown={ onInputChange }
                    className={ error ? 'error' : '' }
                    />
                    <i 
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} 
                        onClick={ togglePassword }
                    ></i>
                </div>

                { error && <p className='errorInput'>{ error }</p>}
            </div>

            { confirm &&
                <div className="inputContainer">
                    <label htmlFor={ confirmName }>Confirmar contraseña</label>
                    <div className="pswdInput">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        name={ confirmName }
                        placeholder="Ingresá tu contraseña nuevamente"
                        id={ confirmName }
                        value={ confirmValue }
                        onChange={ onChangeFunction }
                        onBlur={ onValidate }
                        onKeyDown={ onValidateChange }
                        className={ validateError ? 'error' : '' }
                        />
                        <i 
                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} 
                            onClick={togglePassword}
                        ></i>
                    </div>

                    {validateError && <p className='errorInput'>{validateError}</p>}
                </div>
            }
    </>
    )
}
