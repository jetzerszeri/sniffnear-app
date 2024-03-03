import { LoginForm } from '../../auth/components/LoginForm';
import { RegisterForm } from '../../auth/components/RegisterForm';

export const AuthStepOnForms = ( { formState, onPrevius, uploadPetImgAndSetLink, authForm,  setAuthForm} ) => {
    return (
        <div className='multiSteps'>
            <h2>Por último, registrate o iniciá sesión para vincular el perfil de tu mascota con tu cuenta.</h2>

            {
                authForm === 'singup' 
                    ?<RegisterForm 
                        authFlow={false} 
                        label={`Registrarme y crear perfil de ${formState.name}`} 
                        onPrevFunction={ onPrevius }
                        onNextFunction={ uploadPetImgAndSetLink }

                    >
                        <div className='loginSignupSwitch'>
                            <p>¿Ya tenés una cuenta? <span className='link' onClick={() => setAuthForm('login')}>Inicá sesión</span></p>
                        </div>
                    </RegisterForm>
                    : <LoginForm 
                        authFlow={false} 
                        label={`Iniciar sesión y crear perfil de ${formState.name}`} 
                        onPrevFunction={ onPrevius }
                        onNextFunction={ uploadPetImgAndSetLink }
                    >
                        <div className='loginSignupSwitch'>
                            <p>¿No tenés una cuenta? <span className='link' onClick={() => setAuthForm('singup')}>Registrate</span></p>
                        </div>

                    </LoginForm>
            }

        </div>
    )
}
