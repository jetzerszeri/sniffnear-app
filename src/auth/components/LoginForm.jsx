import { useState } from "react";
import { useForm } from "../../hooks"



export const LoginForm = () => {


    const { onInputChange, email, password } = useForm({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const onLoginSubmit = (e) => {
        e.preventDefault();
        // console.log({ email, password })

        const newErrors = {}
        

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

        
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0){
            return;
        }
        
        console.log('Formulario válido');

    }







    return (
        <form onSubmit={ onLoginSubmit }>
            {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}

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
                <input
                type="password"
                name="password"
                placeholder="Ingresá tu contraseña"
                id="password"
                value={password}
                onChange={onInputChange}
                />
                {errors.password && <p className='errorInput'>{errors.password}</p>}
            </div>

            <div>
                <button type="submit">Iniciar sesión</button>
                {/* <p>¿Ya tenés una cuenta? <Link to="/register">Registrate</Link></p> */}
            </div>


        </form>
    )
}
