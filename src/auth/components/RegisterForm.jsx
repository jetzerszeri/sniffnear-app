import { useContext, useState } from "react"
import { useForm } from "../../hooks"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const RegisterForm = () => {

    const navigate = useNavigate();

    const { onInputChange, name, email, password, validatePassword } = useForm({
        name: '',
        email: '',
        password: '',
        validatePassword: '',
    })

    const [ errors, setErrors ] = useState( {} );
    const [ showPassword, setShowPassword ] = useState( false );
    const { login } = useContext( AuthContext );
    
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (name.trim().length === 0){
            newErrors.name = 'El nombre es obligatorio*';
        }

        if (email.trim().length === 0){
            newErrors.email = 'El email es obligatorio*';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'El email ingresado es inválido*';
        }

        if (password.trim().length === 0){
            newErrors.password= 'La contraseña es obligatoria*';
        } else if (password.length < 6) {
            newErrors.password= 'La contraseña debe tener al menos 6 caracteres*';
        }

        if (password !== validatePassword){
            newErrors.validatePassword = 'Las contraseñas no coinciden*';
        }


        setErrors(newErrors);
        if ( Object.keys(newErrors).length > 0){
            return
        }


        try {
            const response = await fetch('https://sniffnear-api.onrender.com/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const json = await response.json();

            if (response.ok) {  
                console.log(json)

                login( json.user._id, json.user.name, json.user.email );
                navigate('/', { replace: true });

            } else {
                setErrors({ credentials: `${json.message}*`});
            }

        } catch (error) {
            setErrors({ credentials: `Hubo un error en el servidor, por favor intenta más tarde*`});
        }


    }

    return (
        <form onSubmit={ onRegisterSubmit }>
            {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}

            <div>
                <label htmlFor="name">Nombre</label>
                <input
                name="name"
                placeholder="Jake Suarez"
                id="name"
                value={name}
                onChange={onInputChange}
                />
                {errors.name && <p className='errorInput'>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                name="email"
                placeholder="ejemplo@mail.com"
                id="email"
                value={email}
                onChange={onInputChange}
                />
                {errors.email && <p className='errorInput'>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <div className="pswdInput">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Ingresá tu contraseña"
                    id="password"
                    value={password}
                    onChange={onInputChange}
                    />
                    <i 
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} 
                        onClick={togglePassword}
                    ></i>
                </div>

                {errors.password && <p className='errorInput'>{errors.password}</p>}
            </div>

            <div>
                <label htmlFor="validatePassword">Confirmar contraseña</label>
                <div className="pswdInput">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    name="validatePassword"
                    placeholder="Ingresa tu contraseña nuevamente"
                    id="validatePassword"
                    value={validatePassword}
                    onChange={onInputChange}
                    />
                    <i 
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} 
                        onClick={togglePassword}
                    ></i>
                </div>

                {errors.validatePassword && <p className='errorInput'>{errors.validatePassword}</p>}
            </div>

            <div>
                <button type="submit">Registrarme</button>
                <p>¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link></p>
            </div>



        </form>
    )
}
