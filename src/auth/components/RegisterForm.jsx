import { useContext, useEffect } from "react";
import { useFetchSniffNearApi, useForm } from "../../hooks";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../../ui";
import { PasswordInput, TextInput } from "../../ui/customInputs";
import { EmailInput } from "../../ui/customInputs";


export const RegisterForm = ( { accountStatus, authFlow = true, label = 'Registrarme', onPrevFunction, onNextFunction, children } ) => {

    const { onInputChange, name, email, password, validatePassword, errors, setErrors, checkErrors, setCheckErrors } = useForm({
        name: '',
        email: '',
        password: '',
        validatePassword: '',
    })
    const { singup, login, isLogged } = useContext( AuthContext );
    const { data, isLoading, error, createUser } = useFetchSniffNearApi();

    useEffect(() => {
        if (data && data.user && !isLogged) {
            const user = data.user;

            if ( authFlow) {
                singup( user._id, user.name, user.email, user.profileImg );
            } else {
                login( user._id, user.name, user.email);
                onNextFunction && onNextFunction(user._id);
            }

            if (accountStatus){
             accountStatus( { created: true } );
            }    
        } 
    }, [ data, singup, accountStatus, authFlow, login, isLogged, onNextFunction ]);

    useEffect(() => {
        if (error) {
            setErrors({ credentials: `${error}*`});
        }
    }, [ error, setErrors ]); 
    

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if (name === '' || email === '' || password === '' || password !== validatePassword ){
            return
        };

        createUser({ email, password, name });

    }


    return (
    <>
        <form onSubmit={ onRegisterSubmit }>
            {errors.credentials && <p className='errorInput credential'>{errors.credentials}</p>}

            <TextInput 
                name="name"
                value={ name }
                placeholder="Jake Suarez"
                onChangeFunction={ onInputChange }
                label="Nombre"
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />

            <EmailInput
                value={ email }
                onChangeFunction={ onInputChange }
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />

            <PasswordInput
                value={ password }
                confirm={ true }
                confirmName="validatePassword"
                confirmValue={ validatePassword }
                onChangeFunction={ onInputChange }
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />

            {
                !authFlow && children && children
            }

            <div className={`${!authFlow ? "actions" : ''} btns`}>
                { !authFlow && <button type="button" className="btn secundary" onClick={onPrevFunction}>Regresar</button> }
                <button type="submit" className="btn">{ label }</button>
                { authFlow && <p>¿Ya tenés una cuenta? <Link to="/auth/login">Iniciá sesión</Link></p> }
            </div>

        </form>

        {
            isLoading && <Loader label="Creando cuenta..." />
        }
        
    </>
    )
}
