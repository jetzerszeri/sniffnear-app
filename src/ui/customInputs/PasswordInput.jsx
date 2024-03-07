import { useCallback, useEffect, useState } from 'react';


export const PasswordInput = ( { name = "password", value, onChangeFunction, errors, required = false, setErrors, confirm = false, newPassword = false,  confirmValue, confirmName ="validatePassword", checkErrors, label = "Contraseña", placeholder = "Ingresá tu contraseña"} ) => {

    const [showPassword, setShowPassword] = useState( false );
    let error = errors[name];
    let validateError = errors[confirmName];


    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const onRequired = useCallback(() => {
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
    }, [ required, value, name, setErrors ]);

    const onValidate = useCallback(() => {
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
    }, [ confirm, value, confirmValue, confirmName, setErrors ]);

    const onInputChange = () => {
        if ( error ){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    }

    const onValidateChange = useCallback(() => {
        if (validateError || value === confirmValue){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[confirmName];
                return updatedErrors;
            });
        } 
    }, [ validateError, value, confirmValue, confirmName, setErrors ]);

    useEffect(() => {
        if (checkErrors){
            onRequired();
            if (confirm){ onValidate();}
        }
    }, [checkErrors, onRequired, confirm, onValidate])


    return (
    <>
            <div className="inputContainer">
                <label htmlFor={ name }>{label}</label>
                <div className="pswdInput">
                    <input
                    type={ showPassword ? 'text' : 'password'}
                    name={ name }
                    placeholder={placeholder}
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
                    <label htmlFor={ confirmName }>{ newPassword ? 'Confirma tu nueva contraseña' : 'Confirmar contraseña'}</label>
                    <div className="pswdInput">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        name={ confirmName }
                        placeholder={newPassword ? "Volvé a ingresar tu nueva contraseña" : "Ingresá nuevamente tu contraseña"}
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
