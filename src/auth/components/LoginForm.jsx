import { useContext, useEffect } from "react";
import { useFetchSniffNearApi, useForm } from "../../hooks"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../../ui";
import { EmailInput, PasswordInput } from "../../ui/customInputs";


export const LoginForm = ( { authFlow = true, label, onPrevFunction, onNextFunction, children } ) => {

    const navigate = useNavigate();

    const { onInputChange, email, password, errors, setErrors, checkErrors, setCheckErrors } = useForm({
        email: '',
        password: ''
    })
    const { login } = useContext( AuthContext );
    const { data, isLoading, error, loginUser } = useFetchSniffNearApi();

    useEffect(() => {
        if (error) {
            setErrors({ credentials: `${error}*`});
        }
    }, [ error, setErrors ]);

    useEffect(() => {
        if (data && data.user) {
            const user = data.user;

            if ( authFlow) {
                login( user._id, user.name, user.email, user.profileImg);
                navigate('/', { replace: true })
            } else {
                login( user._id, user.name, user.email, user.profileImg);
                onNextFunction && onNextFunction(user._id);
            }

        }
    }, [ data, login, navigate ]);
    
    

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if ( email === '' || password === ''){
            return
        }

        loginUser({ email, password });
    }


    return (
        <>
        <form onSubmit={ onLoginSubmit }>
            {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}

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
                onChangeFunction={ onInputChange }
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />

            {
                !authFlow && children && children
            }

            {
                authFlow 
                ?<div>
                    <button type="submit" className="btn">Iniciar sesión</button>
                    <p>¿No tenés una cuenta? <Link to="/auth/register">Registrate</Link></p>
                </div>
                : <div className="actions">
                    <button type="button" className="btn secundary" onClick={onPrevFunction}>Regresar</button>
                    <button type="submit" className="btn">{ label }</button>
                </div>
            }


        </form>
        
        {
            isLoading && <Loader label="Iniciando sesión..." />
        }
        
        </>
    )
}
