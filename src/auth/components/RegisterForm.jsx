import { useContext, useEffect, useState } from "react"
import { useFetchSniffNearApi, useForm } from "../../hooks"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../../ui";
import { PasswordInput, TextInput } from "../../ui/customInputs";
import { EmailInput } from "../../ui/customInputs";


export const RegisterForm = ( { accountStatus } ) => {

    const { onInputChange, name, email, password, validatePassword } = useForm({
        name: '',
        email: '',
        password: '',
        validatePassword: '',
    })

    const [ errors, setErrors ] = useState( {} );
    const { singup } = useContext( AuthContext );
    const { data, isLoading, error, createUser } = useFetchSniffNearApi();
    const [ checkErrors, setCheckErrors ] = useState( false );

    useEffect(() => {
        if (data && data.user) {
            const user = data.user;
            singup( user._id, user.name, user.email, user.profileImg );
            accountStatus( { created: true } );
        }
    }, [ data, singup, accountStatus ]);

    useEffect(() => {
        if (error) {
            setErrors({ credentials: `${error}*`});
        }
    }, [ error ]); 
    

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        setCheckErrors( true );

        if (name === '' || Object.keys(errors).length > 0){
            return
        };

        createUser({ email, password, name });
    }


    return (
    <>
        <form onSubmit={ onRegisterSubmit }>
            {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}

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

            <div>
                <button type="submit">Registrarme</button>
                <p>¿Ya tenés una cuenta? <Link to="/auth/login">Iniciá sesión</Link></p>
            </div>

        </form>

        {
            isLoading && <Loader label="Creando cuenta..." />
        }
        
    </>
    )
}
