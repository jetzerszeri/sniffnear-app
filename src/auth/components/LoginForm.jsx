import { useContext, useEffect, useState } from "react";
import { useFetchSniffNearApi, useForm } from "../../hooks"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../../ui";
import { EmailInput, PasswordInput } from "../../ui/customInputs";


export const LoginForm = () => {

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
    }, [ error ]);

    useEffect(() => {
        if (data && data.user) {
            const user = data.user;
            login( user._id, user.name, user.email, user.profileImg);
            navigate('/', { replace: true })
        }
    }, [ data, login, navigate ]);
    
    

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if ( email === '' || Object.keys(errors).length > 0){
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

            <div>
                <button type="submit" className="btn">Iniciar sesión</button>
                <p>¿No tenés una cuenta? <Link to="/auth/register">Registrate</Link></p>
            </div>
        </form>
        
        {
            isLoading && <Loader label="Iniciando sesión..." />
        }
        
        </>
    )
}
